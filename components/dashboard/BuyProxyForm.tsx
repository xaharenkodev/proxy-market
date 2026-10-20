"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";
import CurrencySwitcher from "@/components/marketing/CurrencySwitcher";
import CheckoutLegal from "@/components/legal/CheckoutLegal";
import { locations, getCitiesForCountry, getCarriersForCountry, getLocationByCountry } from "@/config/locations";
import { packageTemplates, PACKAGE_PRICES_EUR, PackageTemplate, PackageTier, getTier, tierAccessLabel, tierUnitPriceEUR } from "@/config/packages";
import { formatAmount, formatCurrencyFromEUR } from "@/config/currency";
import { useCurrency } from "@/context/CurrencyContext";
import OneTimeBadge from "@/components/ui/OneTimeBadge";
import OneTimeNotice from "@/components/ui/OneTimeNotice";
import { billingModel } from "@/config/billing";
import { completePendingOrder, readPendingOrder, savePendingOrder } from "@/config/checkout";
import { useAuth } from "@/context/AuthContext";

/** Packages are priced and charged in EUR so every payment is a standard amount. */
const CHECKOUT_CURRENCY = "EUR";

export default function BuyProxyForm() {
  const { displayCurrency } = useCurrency();
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const [submittedKind, setSubmittedKind] = useState("");

  // Ready packages location state
  const [pkgCountry, setPkgCountry] = useState("United States");
  const [pkgCity, setPkgCity] = useState("");
  const [pkgCarrier, setPkgCarrier] = useState("");

  // Chosen package amount per card, defaulting to the smallest one
  const [selectedPrices, setSelectedPrices] = useState<Record<string, number>>({});
  const selectedTier = (tpl: PackageTemplate) => getTier(tpl, selectedPrices[tpl.id] ?? PACKAGE_PRICES_EUR[0]) || tpl.tiers[0];

  // Location-derived data for ready packages
  const pkgLocation = getLocationByCountry(pkgCountry);
  const pkgCities = getCitiesForCountry(pkgCountry);
  const pkgCarriers = getCarriersForCountry(pkgCountry);
  const availableTemplates = useMemo(() => {
    if (!pkgLocation) return packageTemplates;
    return packageTemplates.filter((t) => pkgLocation.products.includes(t.productLabel));
  }, [pkgLocation]);

  const cityLabel = pkgCity
    ? (() => { const c = pkgCities.find((ct) => ct.name === pkgCity); return c?.state ? `${c.name}, ${c.state}` : c?.name || pkgCity; })()
    : undefined;

  const handleCountryChange = (val: string) => {
    setPkgCountry(val);
    setPkgCity("");
    setPkgCarrier("");
  };

  const finishOrder = useCallback(
    async (userId: string) => {
      const result = await completePendingOrder(userId);
      if (!result) return false;
      if (!result.ok) { setError(result.error); return false; }
      updateUser(result.order.user as never);
      setSubmittedId(result.order.id);
      setSubmittedKind(result.order.label);
      setSuccess(true);
      return true;
    },
    [updateUser]
  );

  // A payment that was confirmed while the customer was away still owes them
  // their order, so finish it as soon as they are back on this page.
  useEffect(() => {
    if (!user) return;
    const pending = readPendingOrder();
    if (!pending?.attemptId) return;
    let active = true;
    (async () => {
      try {
        const response = await fetch(`/api/payments/ezzygate/status?attempt=${encodeURIComponent(pending.attemptId!)}&userId=${encodeURIComponent(user._id)}`);
        const data = await response.json();
        if (!active || !data.success || data.status !== "approved") return;
        await finishOrder(user._id);
      } catch {}
    })();
    return () => { active = false; };
  }, [finishOrder, user]);

  /**
   * One order, one payment. The fixed price of the chosen package is charged
   * once in EUR at the hosted checkout, and the order itself is placed the
   * moment that payment is confirmed.
   */
  const handlePackageRequest = async (tpl: PackageTemplate, tier: PackageTier) => {
    if (!user) return;
    setLoading(true);
    setError("");
    const amount = tier.priceEUR;
    const label = `${tpl.name} — ${tierAccessLabel(tpl, tier)}`;
    const payload = {
      requestKind: "ready-package",
      packageId: tpl.id,
      priceEUR: tier.priceEUR,
      country: pkgCountry,
      city: pkgCity || undefined,
      carrier: pkgCarrier || undefined,
    };
    savePendingOrder({ amount, currency: CHECKOUT_CURRENCY, label, payload });
    try {
      const res = await fetch("/api/payments/ezzygate/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id || "demo-user-1",
          amount,
          currency: CHECKOUT_CURRENCY,
          currencyIso: CHECKOUT_CURRENCY,
          client_email: user.email || "customer@virenzaproxy.com",
          client_fullName: `${user.name || "Customer"} ${user.surname || ""}`.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "The payment could not be started.");
        return;
      }
      if (data.paymentUrl) {
        savePendingOrder({ attemptId: data.attemptId, amount, currency: CHECKOUT_CURRENCY, label, payload });
        window.location.assign(data.paymentUrl);
        return;
      }
      setError("Payment provider did not return a checkout URL.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-sky-100 sm:rounded-[2rem] sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-slate-950">Order confirmed</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your <strong>{submittedKind}</strong> order <strong>{submittedId}</strong> has been paid with a single
          one-time payment. Our team will review the details and set up your proxies. You will be contacted shortly.
        </p>
        <p className="mt-2 text-sm font-semibold text-emerald-700">
          {billingModel.checkoutNotice}
        </p>
        <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950">
          You were charged once for this order only. Proxy setup is reviewed manually by our team.
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/dashboard/orders"><Button variant="outline">View your orders <ArrowRight size={16} /></Button></Link>
          <Button variant="ghost" onClick={() => { setSuccess(false); setError(""); }}>Place another order</Button>
        </div>
      </div>
    );
  }

  const errorBlock = error && (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <p className="font-semibold">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Ready packages</h2>
          <p className="mt-1 text-sm text-slate-600">Every package is sold at a fixed price of €20, €25, €50 or €100.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm">
          <CreditCard size={16} className="text-emerald-600" />
          <span className="font-bold text-emerald-800">Pay per order — one-time payment</span>
        </div>
      </div>

      {errorBlock}

      <div className="space-y-6">
        {/* Location selector */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-sky-600" />
            <h3 className="text-base font-bold text-slate-950">Select location</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Select label="Country" value={pkgCountry} onChange={(e) => handleCountryChange(e.target.value)}
              options={locations.map((l) => ({ value: l.country, label: `${l.country} (${l.code})` }))} />
            <Select label="City" value={pkgCity} onChange={(e) => setPkgCity(e.target.value)}
              options={[
                { value: "", label: "Country-level (any city)" },
                ...pkgCities.map((c) => ({ value: c.name, label: c.state ? `${c.name}, ${c.state}` : c.name })),
              ]} />
            {pkgCarriers.length > 0 ? (
              <Select label="Carrier (mobile)" value={pkgCarrier} onChange={(e) => setPkgCarrier(e.target.value)}
                options={[
                  { value: "", label: "Any carrier" },
                  ...pkgCarriers.map((c) => ({ value: c, label: c })),
                ]} />
            ) : (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Carrier</label>
                <div className="flex items-center rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">Not available</div>
              </div>
            )}
          </div>
          {pkgLocation && (
            <p className="mt-3 text-xs text-slate-500">
              Available in {pkgLocation.country}: {pkgLocation.products.join(", ")}
            </p>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
              Packages for {pkgCountry}{cityLabel ? `, ${cityLabel}` : ""}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {availableTemplates.length} package{availableTemplates.length !== 1 ? "s" : ""} available. Each package is bought on its own and paid for with a single one-time payment at checkout.
            </p>
          </div>
          <CurrencySwitcher compact />
        </div>

        {/* Cards */}
        {availableTemplates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {availableTemplates.map((tpl) => {
              const tier = selectedTier(tpl);
              return (
              <div key={tpl.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-100 sm:p-6 ${tpl.highlighted ? "border-sky-300" : "border-slate-200"}`}>
                {tpl.highlighted && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500" />}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-slate-950 sm:text-lg">{tpl.name}</h3>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    {tpl.highlighted && <Badge variant="info">Popular</Badge>}
                    <OneTimeBadge />
                  </div>
                </div>
                <p className="mt-1.5 text-sm text-slate-600">{tpl.bestFor}</p>
                <div className="mt-4 grid grid-cols-4 gap-1.5">
                  {tpl.tiers.map((t) => (
                    <button key={t.priceEUR} type="button" onClick={() => setSelectedPrices((prev) => ({ ...prev, [tpl.id]: t.priceEUR }))}
                      className={`rounded-lg border px-1 py-2 text-sm font-bold transition ${t.priceEUR === tier.priceEUR ? "border-sky-400 bg-sky-50 text-sky-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                      €{t.priceEUR}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-950">{formatAmount(tier.priceEUR, CHECKOUT_CURRENCY)}</span>
                    <span className="text-sm font-semibold text-slate-500">one-time</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {tierAccessLabel(tpl, tier)}
                    {" · "}
                    {formatAmount(tierUnitPriceEUR(tier), CHECKOUT_CURRENCY)}{tpl.priceUnit} equivalent
                  </p>
                  {displayCurrency !== CHECKOUT_CURRENCY && (
                    <p className="mt-1 text-xs text-slate-500">≈ {formatCurrencyFromEUR(tier.priceEUR, displayCurrency)} · charged in EUR</p>
                  )}
                  <p className="mt-1 text-xs font-semibold text-emerald-700">{billingModel.priceHint}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tpl.features.map((f) => (
                    <span key={f} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{f}</span>
                  ))}
                </div>
                <div className="mt-3 space-y-1 text-xs text-slate-500">
                  <div className="flex justify-between"><span>Location</span><span className="font-semibold text-slate-700">{cityLabel || pkgCountry}</span></div>
                  <div className="flex justify-between"><span>Protocol</span><span className="font-semibold text-slate-700">{tpl.protocol}</span></div>
                  <div className="flex justify-between"><span>Session</span><span className="font-semibold text-slate-700">{tpl.rotation}</span></div>
                </div>
                <div className="mt-auto pt-4">
                  <Button fullWidth size="sm" variant={tpl.highlighted ? "primary" : "outline"}
                    onClick={() => handlePackageRequest(tpl, tier)} disabled={loading || !user}>
                    {loading ? "Redirecting..." : `Pay ${formatAmount(tier.priceEUR, CHECKOUT_CURRENCY)} once`}
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-sm text-slate-600">No packages available for this location. Try a different country.</p>
          </div>
        )}

        <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950">
          <div className="flex gap-3">
            <ShieldCheck size={18} className="mt-0.5 shrink-0" />
            <span>You pay the fixed package price once at checkout in EUR. Our team reviews the order and sets up your proxies manually.</span>
          </div>
        </div>
      </div>

      <OneTimeNotice variant="checkout" />
      <CheckoutLegal />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDollarSign, CreditCard, Fingerprint, Globe2, LockKeyhole, MapPin, Network, Package, Server, Settings2, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import CurrencySwitcher from "@/components/marketing/CurrencySwitcher";
import CheckoutLegal from "@/components/legal/CheckoutLegal";
import { availableProducts } from "@/config/products";
import { locations, getCitiesForCountry, getCarriersForCountry, getLocationByCountry } from "@/config/locations";
import { packageTemplates } from "@/config/packages";
import { formatAmount, formatCurrencyFromEUR } from "@/config/currency";
import { useCurrency } from "@/context/CurrencyContext";
import OneTimeBadge from "@/components/ui/OneTimeBadge";
import OneTimeNotice from "@/components/ui/OneTimeNotice";
import { billingModel } from "@/config/billing";
import { siteConfig } from "@/config/site";
import { completePendingOrder, oneTimeChargeAmount, readPendingOrder, savePendingOrder } from "@/config/checkout";
import { useAuth } from "@/context/AuthContext";
import { calculateProxyPrice, getDefaultDurationQuantity, ProxyDuration } from "@/src/lib/pricing";

type Tab = "packages" | "custom";

export default function BuyProxyForm() {
  const { displayCurrency } = useCurrency();
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState<Tab>("packages");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const [submittedKind, setSubmittedKind] = useState("");

  // Ready packages location state
  const [pkgCountry, setPkgCountry] = useState("United States");
  const [pkgCity, setPkgCity] = useState("");
  const [pkgCarrier, setPkgCarrier] = useState("");

  // Custom setup state
  const [productId, setProductId] = useState("datacenter");
  const [country, setCountry] = useState("United States");
  const [city, setCity] = useState("");
  const [carrier, setCarrier] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [bandwidth, setBandwidth] = useState("5");
  const [duration, setDuration] = useState("pay-per-gb");
  const [durationQuantity, setDurationQuantity] = useState("1");
  const [rotation, setRotation] = useState("rotating");
  const [protocol, setProtocol] = useState("HTTP");
  const [authMethod, setAuthMethod] = useState("Username/password");

  const selectedProduct = availableProducts.find((p) => p.id === productId) || availableProducts[0];
  const estimatedPriceEUR = useMemo(() => {
    try {
      return calculateProxyPrice({
        proxyType: productId,
        duration: duration as ProxyDuration,
        quantity: Number(quantity),
        durationQuantity: Number(durationQuantity),
        bandwidthGb: Number(bandwidth),
      }).estimatedPriceEUR;
    } catch {
      return 0;
    }
  }, [bandwidth, duration, durationQuantity, productId, quantity]);

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
      const result = await completePendingOrder(userId, displayCurrency);
      if (!result) return false;
      if (!result.ok) { setError(result.error); return false; }
      updateUser(result.order.user as never);
      setSubmittedId(result.order.id);
      setSubmittedKind(result.order.label);
      setSuccess(true);
      return true;
    },
    [displayCurrency, updateUser]
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
   * One order, one payment. The exact price of this order is charged once at
   * the hosted checkout, and the order itself is placed the moment that
   * payment is confirmed.
   */
  const startCheckout = async (payload: Record<string, unknown>, label: string, priceEUR: number) => {
    if (!user) return;
    if (priceEUR <= 0) { setError("This configuration does not produce a valid price."); return; }
    setLoading(true);
    setError("");
    const amount = oneTimeChargeAmount(priceEUR, displayCurrency);
    savePendingOrder({ amount, currency: displayCurrency, label, payload });
    try {
      const endpoint = siteConfig.testMode ? "/api/user/top-up" : "/api/payments/ezzygate/process";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, amount, currency: displayCurrency, currencyIso: displayCurrency }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "The payment could not be started.");
        return;
      }
      if (data.paymentUrl) {
        savePendingOrder({ attemptId: data.attemptId, amount, currency: displayCurrency, label, payload });
        window.location.assign(data.paymentUrl);
        return;
      }
      if (siteConfig.testMode && data.user) {
        updateUser(data.user);
        await finishOrder(user._id);
        return;
      }
      setError("Payment provider did not return a checkout URL.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePackageRequest = (templateId: string, priceEUR: number) =>
    startCheckout(
      {
        requestKind: "ready-package",
        packageId: templateId,
        country: pkgCountry,
        city: pkgCity || undefined,
        carrier: pkgCarrier || undefined,
      },
      "Ready package",
      priceEUR
    );

  const handleCustomSubmit = () =>
    startCheckout(
      {
        requestKind: "custom",
        proxyType: productId,
        country,
        city: city || undefined,
        carrier: carrier || undefined,
        protocol,
        rotation,
        authMethod,
        quantity: Number(quantity) || 1,
        bandwidthGb: Number(bandwidth) || 1,
        duration,
        durationQuantity: Number(durationQuantity) || 1,
      },
      "Custom setup",
      estimatedPriceEUR
    );

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
        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:inline-flex sm:rounded-2xl">
          <button type="button" onClick={() => { setTab("packages"); setError(""); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition sm:flex-initial sm:rounded-xl sm:px-6 ${tab === "packages" ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-950"}`}>
            <Package size={16} /> Ready packages
          </button>
          <button type="button" onClick={() => { setTab("custom"); setError(""); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition sm:flex-initial sm:rounded-xl sm:px-6 ${tab === "custom" ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-950"}`}>
            <Settings2 size={16} /> Custom setup
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm">
          <CreditCard size={16} className="text-emerald-600" />
          <span className="font-bold text-emerald-800">Pay per order — one-time payment</span>
        </div>
      </div>

      {errorBlock}

      {/* ===== READY PACKAGES ===== */}
      {tab === "packages" && (
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
              {availableTemplates.map((tpl) => (
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
                  <div className="mt-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-950">{formatAmount(oneTimeChargeAmount(tpl.priceEUR, displayCurrency), displayCurrency)}</span>
                      <span className="text-sm font-semibold text-slate-500">one-time</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {tpl.durationDays ? `${tpl.durationDays} days access` : tpl.bandwidthGb ? `${tpl.bandwidthGb} GB prepaid traffic` : "One-time access"}
                      {" · "}
                      {formatCurrencyFromEUR(tpl.unitPriceEUR, displayCurrency)}{tpl.priceUnit} equivalent
                    </p>
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
                      onClick={() => handlePackageRequest(tpl.id, tpl.priceEUR)} disabled={loading || !user}>
                      {loading ? "Redirecting..." : `Pay ${formatAmount(oneTimeChargeAmount(tpl.priceEUR, displayCurrency), displayCurrency)} once`}
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-sm text-slate-600">No packages available for this location. Try a different country or use Custom setup.</p>
            </div>
          )}

          <OneTimeNotice variant="checkout" />

          <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950">
            <div className="flex gap-3">
              <ShieldCheck size={18} className="mt-0.5 shrink-0" />
              <span>You pay for this one order at checkout in {displayCurrency}. Our team reviews the order and sets up your proxies manually.</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== CUSTOM SETUP ===== */}
      {tab === "custom" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-sky-100 sm:rounded-[2rem]">
            <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">Custom proxy setup</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Configure your requirements and pay once at checkout — one payment for this order, no subscription, no auto-renewal.</p>
                </div>
                <CurrencySwitcher />
              </div>
            </div>
            <div className="grid gap-0 lg:grid-cols-[200px_1fr]">
              <div className="hidden border-r border-slate-100 bg-slate-950 p-4 text-white lg:block">
                {[
                  { icon: Server, title: "Product", text: selectedProduct.shortName },
                  { icon: Globe2, title: "Targeting", text: country },
                  { icon: Network, title: "Protocol", text: protocol },
                  { icon: LockKeyhole, title: "Auth", text: authMethod },
                ].map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className={`rounded-xl p-3 ${index === 0 ? "bg-white text-slate-950" : "text-slate-300"}`}>
                    <Icon size={16} className={index === 0 ? "text-sky-600" : "text-cyan-300"} />
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide opacity-70">{title}</p>
                    <p className="mt-0.5 truncate text-sm font-bold">{text}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                  <Select label="Proxy type" value={productId} onChange={(e) => setProductId(e.target.value)} options={availableProducts.map((p) => ({ value: p.id, label: p.name }))} />
                  <Select label="Country" value={country} onChange={(e) => setCountry(e.target.value)} options={locations.map((l) => ({ value: l.country, label: l.country }))} />
                  <Input label="City (if available)" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Optional" />
                  <Input label="Carrier (mobile only)" value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="Optional" />
                  <Input label="Quantity" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  {duration === "pay-per-gb" ? (
                    <Input label="Bandwidth per proxy / GB" type="number" min={1} value={bandwidth} onChange={(e) => setBandwidth(e.target.value)} />
                  ) : (
                    <Input label={duration === "daily" ? "Number of days" : duration === "weekly" ? "Number of weeks" : "Number of months"} type="number" min={1} value={durationQuantity} onChange={(e) => setDurationQuantity(e.target.value)} />
                  )}
                  <Select label="Access period (one-time)" value={duration} onChange={(e) => { const next = e.target.value as ProxyDuration; setDuration(next); setDurationQuantity(getDefaultDurationQuantity(next).toString()); }} options={[{ value: "daily", label: "Daily — one-time" }, { value: "weekly", label: "Weekly — one-time" }, { value: "monthly", label: "Monthly — one-time" }, { value: "pay-per-gb", label: "Prepaid traffic — one-time" }]} />
                  <Select label="Rotation type" value={rotation} onChange={(e) => setRotation(e.target.value)} options={[{ value: "rotating", label: "Rotating" }, { value: "sticky", label: "Sticky" }]} />
                </div>
                <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Protocol</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {["HTTP", "SOCKS5"].map((item) => (
                        <button key={item} type="button" onClick={() => setProtocol(item)} className={`rounded-xl border px-3 py-2.5 text-sm font-bold transition sm:rounded-2xl sm:px-4 sm:py-3 ${protocol === item ? "border-sky-400 bg-sky-50 text-sky-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{item}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Authentication</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {["Username/password", "IP whitelist"].map((item) => (
                        <button key={item} type="button" onClick={() => setAuthMethod(item)} className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm ${authMethod === item ? "border-sky-400 bg-sky-50 text-sky-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{item}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-sky-100 sm:rounded-[2rem] sm:p-6 xl:sticky xl:top-24 xl:self-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white"><CircleDollarSign size={22} /></div>
            <h2 className="mt-4 text-xl font-bold text-slate-950 sm:mt-5 sm:text-2xl">Order total</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Charged once at checkout for this order only. No subscription is created.</p>
            <OneTimeBadge long className="mt-3" />
            <div className="mt-5 rounded-2xl bg-[linear-gradient(135deg,#0f172a,#075985)] p-4 text-white sm:mt-6 sm:rounded-3xl sm:p-5">
              <p className="text-sm text-sky-100">Total price — charged once</p>
              <p className="mt-1 text-3xl font-bold sm:text-4xl">{formatAmount(oneTimeChargeAmount(estimatedPriceEUR, displayCurrency), displayCurrency)}</p>
              <p className="mt-2 text-xs text-sky-100">EUR base: EUR {estimatedPriceEUR.toFixed(2)}</p>
            </div>
            <dl className="mt-5 space-y-2.5 text-sm sm:mt-6 sm:space-y-3">
              {[["Product", selectedProduct.name], ["Location", city ? `${country}, ${city}` : country], ["Rotation", rotation], ["Access period", duration === "pay-per-gb" ? `${bandwidth} GB per proxy` : `${durationQuantity} ${duration === "daily" ? "day(s)" : duration === "weekly" ? "week(s)" : "month(s)"}`], [billingModel.billingTypeLabel, billingModel.billingTypeValue], [billingModel.autoRenewalLabel, billingModel.autoRenewalValue]].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3 border-b border-slate-100 pb-2.5 sm:pb-3">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="min-w-0 truncate text-right font-bold text-slate-950">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-950 sm:mt-6 sm:rounded-3xl sm:p-4">
              <div className="flex gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0" /><span>You are charged once for this order at checkout. Proxy setup is reviewed manually by our team.</span></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5">
              {[Fingerprint, CheckCircle2].map((Icon, index) => (
                <div key={index} className="rounded-xl bg-slate-50 p-3 sm:rounded-2xl">
                  <Icon size={16} className="text-sky-600" />
                  <p className="mt-2 text-xs font-bold text-slate-600">{index === 0 ? "Compliance verified" : "Manual review"}</p>
                </div>
              ))}
            </div>
            <Button className="mt-4 sm:mt-5" fullWidth onClick={handleCustomSubmit} disabled={loading || !user}>
              {loading ? "Redirecting..." : `Pay ${formatAmount(oneTimeChargeAmount(estimatedPriceEUR, displayCurrency), displayCurrency)} once`}
            </Button>
          </aside>
        </div>
      )}

      <OneTimeNotice variant="checkout" />
      <CheckoutLegal />
    </div>
  );
}

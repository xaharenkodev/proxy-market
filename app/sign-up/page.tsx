"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthVisual from "@/components/auth/AuthVisual";
import { useAuth } from "@/context/AuthContext";
import { countries } from "@/data/countries";

interface FormState {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  dob: string;
  street: string;
  city: string;
  country: string;
  postCode: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn) router.replace("/dashboard");
  }, [isLoggedIn, router]);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    dob: "",
    street: "",
    city: "",
    country: "",
    postCode: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const required: (keyof FormState)[] = ["email", "password", "name", "surname", "phone", "dob", "street", "city", "country", "postCode"];
    if (required.some((field) => !form[field])) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms of Service.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          surname: form.surname,
          phoneNumber: form.phone,
          dateOfBirth: form.dob,
          address: {
            street: form.street,
            city: form.city,
            country: form.country,
            postCode: form.postCode,
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        login(data.user);
        router.push("/dashboard");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-12 sm:py-16 lg:py-24">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <AuthVisual />
          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-sky-100 sm:rounded-[2rem] sm:p-6">
            <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Create your Virenza Proxy account</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3">
              Access orders, invoices and proxy management screens.
            </p>
            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2">
              <Input label="First name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <Input label="Surname" value={form.surname} onChange={(e) => update("surname", e.target.value)} />
              <Input className="sm:col-span-2" label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <Input label="Password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} />
              <Input label="Phone number" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <Input label="Date of birth" type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
              <Input label="Street address" value={form.street} onChange={(e) => update("street", e.target.value)} />
              <Input label="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
              <Input label="Post code" value={form.postCode} onChange={(e) => update("postCode", e.target.value)} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Country</label>
                <select
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm text-slate-600 sm:mt-5">
              <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setError(""); }} className="mt-1 h-4 w-4 rounded border-slate-300 accent-sky-600" />
              <span>
                I agree to the <Link href="/terms" className="font-semibold text-sky-700">Terms</Link>, <Link href="/privacy" className="font-semibold text-sky-700">Privacy Policy</Link> and acceptable-use rules.
              </span>
            </label>
            {error && <p className="mt-3 text-sm text-red-600 sm:mt-4">{error}</p>}
            <Button type="submit" fullWidth size="lg" disabled={loading} className="mt-5 sm:mt-6">
              <UserPlus size={18} />
              {loading ? "Creating account..." : "Create account"}
            </Button>
            <p className="mt-5 text-center text-sm text-slate-600 sm:mt-6">
              Already have an account? <Link href="/login" className="font-bold text-sky-700">Login</Link>
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

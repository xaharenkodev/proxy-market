"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/user/password-reset/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await response.json();
      if (response.ok && data.success) setMessage(data.message);
      else setError(data.error || "Unable to request a password reset.");
    } catch { setError("Unable to request a password reset."); }
    finally { setLoading(false); }
  };

  return <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-16 lg:py-24"><Container><form onSubmit={submit} className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-sky-100 sm:p-8"><h1 className="text-3xl font-bold text-slate-950">Reset your password</h1><p className="mt-3 text-sm leading-6 text-slate-600">Enter your account email and we will send a reset link that expires in 60 minutes.</p><Input className="mt-6" label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />{message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<Button className="mt-6" fullWidth type="submit" disabled={loading}>{loading ? "Sending..." : "Send reset link"}</Button><p className="mt-5 text-center text-sm text-slate-600"><Link href="/login" className="font-bold text-sky-700">Back to login</Link></p></form></Container></section>;
}

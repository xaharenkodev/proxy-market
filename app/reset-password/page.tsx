"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token") || "";
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token || password.length < 8 || password !== confirmPassword) { setError("Use a valid reset link and matching passwords of at least 8 characters."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/user/password-reset/confirm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
      const data = await response.json();
      if (response.ok && data.success) router.replace("/login?reset=success");
      else setError(data.error || "Unable to reset your password.");
    } catch { setError("Unable to reset your password."); }
    finally { setLoading(false); }
  };
  return <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-16 lg:py-24"><Container><form onSubmit={submit} className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-sky-100 sm:p-8"><h1 className="text-3xl font-bold text-slate-950">Choose a new password</h1><p className="mt-3 text-sm leading-6 text-slate-600">Your new password must contain at least 8 characters.</p><Input className="mt-6" label="New password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /><Input className="mt-4" label="Confirm new password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<Button className="mt-6" fullWidth type="submit" disabled={loading}>{loading ? "Saving..." : "Reset password"}</Button><p className="mt-5 text-center text-sm text-slate-600"><Link href="/login" className="font-bold text-sky-700">Back to login</Link></p></form></Container></section>;
}

export default function ResetPasswordPage() {
  return <Suspense fallback={<div className="py-16 text-center text-slate-500">Loading password reset...</div>}><ResetPasswordForm /></Suspense>;
}

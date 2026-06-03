"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthVisual from "@/components/auth/AuthVisual";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) router.replace("/dashboard");
  }, [isLoggedIn, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        login(data.user);
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed.");
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
        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-2">
          <AuthVisual />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-sky-100 sm:rounded-[2rem] sm:p-6">
            <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Login to ProxyMarket</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3">
              Access your balance, proxy configuration, order history and support tools.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8">
              <Input label="Email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} />
              <Input label="Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" fullWidth size="lg" disabled={loading}>
                <LogIn size={18} />
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-600 sm:mt-6">
              New to ProxyMarket?{" "}
              <Link href="/register" className="font-bold text-sky-700">Create account</Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

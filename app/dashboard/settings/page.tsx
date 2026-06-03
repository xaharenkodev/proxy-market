"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function DashboardSettingsPage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          name,
          surname,
          email,
          phoneNumber: phone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        updateUser(data.user);
        setSuccess(true);
      } else {
        setError(data.error || "Failed to save profile.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Settings</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Manage your profile information.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
        <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Profile</h2>
        <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 sm:grid-cols-2">
          <Input
            label="First name"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); setSuccess(false); }}
          />
          <Input
            label="Surname"
            value={surname}
            onChange={(e) => { setSurname(e.target.value); setError(""); setSuccess(false); }}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); setSuccess(false); }}
          />
          <Input
            label="Phone number"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setError(""); setSuccess(false); }}
          />
        </div>
        {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
        {success && (
          <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={16} /> Profile updated successfully.
          </p>
        )}
        <Button className="mt-5" onClick={handleSave} disabled={loading || !user}>
          {loading ? "Saving..." : "Save profile"}
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
        <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Security</h2>
        <p className="mt-2 text-sm text-slate-600 sm:mt-3">Password reset, 2FA and session management will be available in a future update.</p>
      </div>
    </div>
  );
}

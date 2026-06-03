"use client";

import { useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Send } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SectionHeader from "@/components/marketing/SectionHeader";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.error || "Failed to send message.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-12 sm:py-16 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow="Contact"
            title="Talk to ProxyMarket support"
            description="Ask about proxy workflows, billing, compliance, or upcoming API products."
          />
        </Container>
      </section>
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-[0.7fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: Mail, title: "Business support", text: siteConfig.companyEmail || "Use the contact form" },
                { icon: MessageSquare, title: "Response time", text: "We typically respond within one business day." },
                { icon: CheckCircle2, title: "Safe-use help", text: "We can help clarify acceptable public data and testing workflows." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
                  <Icon size={20} className="text-sky-600" />
                  <h2 className="mt-3 text-base font-bold text-slate-950 sm:mt-4 sm:text-lg">{title}</h2>
                  <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">{text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
              {success ? (
                <div className="py-10 text-center sm:py-12">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500 sm:h-12 sm:w-12" />
                  <h2 className="mt-4 text-lg font-bold text-slate-950 sm:text-xl">Message sent</h2>
                  <p className="mt-2 text-sm text-slate-600">We received your message and will respond as soon as possible.</p>
                  <Button className="mt-5 sm:mt-6" variant="outline" onClick={() => setSuccess(false)}>Send another</Button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    <Input label="Name" value={form.name} onChange={(e) => update("name", e.target.value)} />
                    <Input label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                  </div>
                  <Input label="Subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} />
                  <div>
                    <label className="text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <Button type="submit" fullWidth size="lg" disabled={loading}>
                    <Send size={18} />
                    {loading ? "Sending..." : "Send message"}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

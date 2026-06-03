"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

interface GuestBlockProps {
  title: string;
  description: string;
}

export default function GuestBlock({ title, description }: GuestBlockProps) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50">
            <Lock size={28} className="text-sky-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
          <p className="mt-3 text-slate-600">{description}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">Create Account</Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

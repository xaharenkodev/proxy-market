"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-lg text-center"
        >
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-7xl font-bold text-transparent sm:text-8xl">
            404
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-950">Page not found</h1>
          <p className="mt-3 text-slate-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button>
                <Home size={18} />
                Back to home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft size={18} />
                Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

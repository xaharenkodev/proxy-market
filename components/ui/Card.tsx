"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export default function Card({ children, hover = false, glow = false, className = "", ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`
        relative rounded-2xl border border-slate-200 bg-white shadow-sm
        ${hover ? "transition-shadow duration-300 hover:shadow-md hover:border-slate-300" : ""}
        ${glow ? "shadow-lg shadow-sky-100" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

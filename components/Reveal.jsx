"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Apparition douce à l'entrée dans le viewport. Une seule fois. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}) {
  const still = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={still ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

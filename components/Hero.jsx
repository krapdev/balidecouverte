"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import Scene, { JepunBranch } from "./Scene";
import { DESTINATIONS } from "@/lib/data";

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const still = useReducedMotion();

  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-immersive-deep text-on-immersive"
      >
        <div className="absolute inset-0">
          <Scene kind="terraces" w={1600} h={900} uid="hero" className="h-full w-full object-cover" />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--immersive-deep)_82%,transparent)_0%,color-mix(in_srgb,var(--immersive-deep)_66%,transparent)_34%,color-mix(in_srgb,var(--immersive-deep)_90%,transparent)_66%,var(--immersive-deep)_100%)]"
          aria-hidden="true"
        />

        <JepunBranch className="pointer-events-none absolute -top-4 right-0 z-[1] w-[min(52vw,440px)] opacity-95" />

        <motion.div
          className="shell relative z-10 flex min-h-[min(88vh,780px)] flex-col items-start justify-end gap-6 pb-[clamp(3rem,9vw,5.5rem)] pt-[clamp(3.5rem,12vw,7rem)]"
          initial={still ? false : "hidden"}
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
        >
          <motion.p
            variants={rise}
            className="label flex items-center gap-3 text-on-immersive before:h-px before:w-8 before:bg-accent before:content-['']"
          >
            Sidemen · Munduk · Est de Bali
          </motion.p>

          <motion.h1
            variants={rise}
            className="max-w-[15ch] text-[clamp(2.5rem,8.5vw,4.75rem)] tracking-[-0.03em]"
          >
            Bali loin des foules. Votre guide privé{" "}
            <em className="italic text-accent">francophone</em> local.
          </motion.h1>

          <motion.p
            variants={rise}
            className="max-w-[46ch] text-lg leading-relaxed text-on-immersive-soft"
          >
            Circuits 100 % sur-mesure, authenticité garantie et 0 intermédiaire.
            Vous échangez directement avec Agus, guide balinais indépendant.
          </motion.p>

          <motion.div variants={rise} className="flex flex-wrap gap-3">
            <a className="btn btn-accent btn-lg" href="#sur-mesure">
              Créer mon voyage sur-mesure
            </a>
            <a
              className="btn btn-outline btn-lg text-on-immersive"
              href="#experiences"
            >
              Voir les expériences
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-4 flex w-full flex-wrap items-center gap-3 border-t border-[color-mix(in_srgb,var(--on-immersive)_18%,transparent)] pt-5"
          >
            <span className="flex gap-0.5 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <p className="text-sm text-on-immersive-soft">
              <b className="font-semibold text-on-immersive">4,9 / 5</b> — plus
              de 200 voyageurs francophones accompagnés depuis 2016.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Le fil des étapes — bandeau défilant */}
      <div
        className="overflow-hidden border-y border-[color-mix(in_srgb,var(--on-immersive)_12%,transparent)] bg-immersive py-3 text-on-immersive-soft"
        aria-hidden="true"
      >
        <div className="flex w-max gap-12 motion-safe:animate-[drift_42s_linear_infinite]">
          {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
            <span key={i} className="label whitespace-nowrap">
              {d} <span className="text-accent">◦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

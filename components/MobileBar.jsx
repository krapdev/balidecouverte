"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTrip } from "@/lib/trip-store";

/** Rappel permanent du circuit en cours de construction, sur mobile. */
export default function MobileBar() {
  const { count } = useTrip();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3.5 border-t border-rule bg-[color-mix(in_srgb,var(--page)_94%,transparent)] px-[clamp(1.25rem,5vw,3rem)] py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-lg lg:hidden"
        >
          <p className="font-sans text-[0.6875rem] leading-tight text-soft">
            <b className="block font-sans text-base font-bold text-ink">
              {count} expérience{count > 1 ? "s" : ""}
            </b>
            dans votre circuit
          </p>
          <a className="btn btn-accent ml-auto" href="#sur-mesure">
            Ma demande
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

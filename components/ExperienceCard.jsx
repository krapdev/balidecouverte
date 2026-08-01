"use client";

import { Check, Plus, MapPin, Clock } from "lucide-react";
import Scene from "./Scene";
import { useTrip } from "@/lib/trip-store";

export default function ExperienceCard({ experience }) {
  const { isSelected, toggleExperience } = useTrip();
  const on = isSelected(experience.id);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded border bg-page transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_34px_-24px_rgba(15,36,24,.5)] ${
        on
          ? "border-accent"
          : "border-rule hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--rule))]"
      }`}
    >
      <div className="relative aspect-[16/10] bg-immersive-deep">
        <Scene
          kind={experience.scene}
          uid={experience.id}
          className="h-full w-full"
        />
        <span className="label absolute left-3 top-3 rounded-sm bg-[color-mix(in_srgb,var(--canopy)_78%,transparent)] px-2.5 py-1.5 text-sand backdrop-blur-sm">
          {experience.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
        <div className="label flex flex-wrap gap-x-4 gap-y-1 text-faint">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} strokeWidth={2} />
            {experience.place}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} strokeWidth={2} />
            {experience.duration}
          </span>
        </div>

        <h3 className="text-[1.375rem]">{experience.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-soft">
          {experience.text}
        </p>

        <div className="flex items-center justify-between gap-4 border-t border-rule pt-3.5">
          <span className="font-util text-sm tabular-nums">
            {experience.price}{" "}
            <small className="text-[0.6875rem] text-faint">
              {experience.priceNote}
            </small>
          </span>
          <button
            type="button"
            onClick={() => toggleExperience(experience.id)}
            aria-pressed={on}
            className={`btn whitespace-nowrap ${
              on
                ? "border-moss bg-moss text-sand dark:border-lichen dark:bg-lichen dark:text-canopy"
                : "btn-accent"
            }`}
          >
            {on ? (
              <>
                <Check size={15} /> Dans mon circuit
              </>
            ) : (
              <>
                <Plus size={15} /> Ajouter à mon circuit
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

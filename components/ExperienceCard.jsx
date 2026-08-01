"use client";

import { Check, Plus, MapPin, Clock } from "lucide-react";
import Scene from "./Scene";
import { useTrip } from "@/lib/trip-store";

export default function ExperienceCard({ experience }) {
  const { isSelected, toggleExperience } = useTrip();
  const on = isSelected(experience.id);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[18px_18px_3px_3px] border bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-28px_rgba(15,45,50,.5)] ${
        on
          ? "border-accent"
          : "border-rule hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--rule))]"
      }`}
    >
      <div className="relative aspect-[16/11] bg-immersive-deep">
        <Scene
          kind={experience.scene}
          uid={experience.id}
          className="h-full w-full"
        />
        <span className="label absolute left-4 top-4 rounded-full bg-[color-mix(in_srgb,var(--immersive-deep)_72%,transparent)] px-3 py-1.5 text-pasir backdrop-blur-sm">
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
                ? "border-laut bg-laut text-pasir"
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

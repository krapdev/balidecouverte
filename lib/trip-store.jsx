"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { EXPERIENCES, monthOptions } from "./data";

/**
 * État partagé du configurateur.
 * Experiences.jsx écrit dedans (ajout / retrait), TripBuilder.jsx le lit.
 */

const TripContext = createContext(null);

const months = monthOptions();

const initialState = {
  selectedIds: [],
  month: months[10] ?? months[0], // ~1 an devant, saison sèche
  duration: "10 à 14 jours",
  adults: 2,
  children: 0,
  styles: ["Nature", "Culture"],
  name: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleExperience": {
      const has = state.selectedIds.includes(action.id);
      return {
        ...state,
        selectedIds: has
          ? state.selectedIds.filter((id) => id !== action.id)
          : [...state.selectedIds, action.id],
      };
    }
    case "removeExperience":
      return {
        ...state,
        selectedIds: state.selectedIds.filter((id) => id !== action.id),
      };
    case "toggleStyle": {
      const has = state.styles.includes(action.style);
      return {
        ...state,
        styles: has
          ? state.styles.filter((s) => s !== action.style)
          : [...state.styles, action.style],
      };
    }
    case "setField":
      return { ...state, [action.field]: action.value };
    case "stepTraveller": {
      const min = action.field === "adults" ? 1 : 0;
      const next = Math.min(20, Math.max(min, state[action.field] + action.step));
      return { ...state, [action.field]: next };
    }
    default:
      return state;
  }
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const selected = state.selectedIds
      .map((id) => EXPERIENCES.find((e) => e.id === id))
      .filter(Boolean);

    return {
      ...state,
      selected,
      count: selected.length,
      isSelected: (id) => state.selectedIds.includes(id),
      toggleExperience: (id) => dispatch({ type: "toggleExperience", id }),
      removeExperience: (id) => dispatch({ type: "removeExperience", id }),
      toggleStyle: (style) => dispatch({ type: "toggleStyle", style }),
      setField: (field, value) => dispatch({ type: "setField", field, value }),
      stepTraveller: (field, step) =>
        dispatch({ type: "stepTraveller", field, step }),
    };
  }, [state]);

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip doit être utilisé dans <TripProvider>");
  return ctx;
}

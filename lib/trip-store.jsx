"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { CIRCUITS, EXPERIENCES, ISLANDS, monthOptions } from "./data";

/**
 * État partagé du configurateur.
 * Experiences.jsx écrit dedans (ajout / retrait), TripBuilder.jsx le lit.
 */

const TripContext = createContext(null);

const months = monthOptions();

const initialState = {
  /* Le circuit choisi comme base de travail — le voyageur part de là et
     déforme. Null tant qu'il n'a rien choisi : la page ne présume rien. */
  baseCircuit: null,
  selectedIds: [],
  islandIds: [],
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
    case "toggleIsland": {
      const has = state.islandIds.includes(action.id);
      return {
        ...state,
        islandIds: has
          ? state.islandIds.filter((id) => id !== action.id)
          : [...state.islandIds, action.id],
      };
    }
    case "toggleStyle": {
      const has = state.styles.includes(action.style);
      return {
        ...state,
        styles: has
          ? state.styles.filter((s) => s !== action.style)
          : [...state.styles, action.style],
      };
    }
    case "setBaseCircuit":
      return { ...state, baseCircuit: action.id };
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
    const circuit = CIRCUITS.find((c) => c.id === state.baseCircuit) ?? null;
    const islands = state.islandIds
      .map((id) => ISLANDS.find((e) => e.id === id))
      .filter(Boolean);

    return {
      ...state,
      selected,
      islands,
      circuit,
      count: selected.length + islands.length,
      isSelected: (id) => state.selectedIds.includes(id),
      isIslandSelected: (id) => state.islandIds.includes(id),
      toggleIsland: (id) => dispatch({ type: "toggleIsland", id }),
      setBaseCircuit: (id) => dispatch({ type: "setBaseCircuit", id }),
      removeIsland: (id) => dispatch({ type: "toggleIsland", id }),
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

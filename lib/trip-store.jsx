"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { ACTIVITES, CIRCUITS, monthOptions } from "./data";

/**
 * État partagé du configurateur.
 *
 * Une seule mécanique de sélection : des activités. Elles servent les
 * deux chemins — soit elles s'ajoutent au circuit pris pour base, soit
 * elles forment à elles seules le squelette du sur-mesure. Activites.jsx
 * et Circuit.jsx écrivent, TripBuilder.jsx lit.
 */

const TripContext = createContext(null);

const months = monthOptions();

const initialState = {
  /* Le circuit choisi comme base de travail — le voyageur part de là et
     déforme. Null tant qu'il n'a rien choisi : la page ne présume rien. */
  baseCircuit: null,
  actIds: [],
  month: months[10] ?? months[0], // ~1 an devant, saison sèche
  duration: "10 à 14 jours",
  adults: 2,
  children: 0,
  styles: ["Nature", "Culture"],
  name: "",
  /* Le champ libre. Tout le configurateur ne sait poser que des
     questions fermées ; c'est la seule case où le voyageur peut dire
     une chose qu'on n'a pas prévue — un anniversaire, un genou fragile,
     un lieu vu ailleurs. C'est souvent la ligne la plus utile du
     message, et sans elle elle n'existait nulle part. */
  note: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleActivite": {
      const has = state.actIds.includes(action.id);
      return {
        ...state,
        actIds: has
          ? state.actIds.filter((id) => id !== action.id)
          : [...state.actIds, action.id],
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
    /* On respecte l'ordre de la liste, pas celui des clics : le
       récapitulatif se lit comme la page. */
    const activites = ACTIVITES.filter((a) => state.actIds.includes(a.id));
    const circuit = CIRCUITS.find((c) => c.id === state.baseCircuit) ?? null;

    return {
      ...state,
      activites,
      circuit,
      count: activites.length,
      isActiviteSelected: (id) => state.actIds.includes(id),
      toggleActivite: (id) => dispatch({ type: "toggleActivite", id }),
      setBaseCircuit: (id) => dispatch({ type: "setBaseCircuit", id }),
      removeActivite: (id) => dispatch({ type: "toggleActivite", id }),
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

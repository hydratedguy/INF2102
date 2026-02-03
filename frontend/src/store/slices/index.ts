export { default as simulatorReducer } from "./simulatorSlice";
export { default as plantsReducer } from "./plantsSlice";
export { default as selectionCardsReducer } from "./selectionCardsSlice";
export { default as mapReducer } from "./mapSlice";
export { default as simulationReducer } from "./simulationSlice";

// Re-export specific items to avoid naming conflicts
export { setInputValue, calculateResult } from "./simulatorSlice";
export { fetchPlants as fetchPlantsLegacy } from "./plantsSlice";
export { addSelectedItem, removeSelectedItem, setDropdownValue, clearCard } from "./selectionCardsSlice";
export {
    setFilter,
    setSearchQuery,
    fetchDestinations,
    fetchPlants,
    fetchAterrosSanitarios,
    fetchEcoparques,
    fetchUsinasAlcool,
} from "./mapSlice";
export { runSimulation, clearSimulation } from "./simulationSlice";
export type { SimulationInput, SimulationResult } from "./simulationSlice";


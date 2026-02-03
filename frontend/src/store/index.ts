import { configureStore } from "@reduxjs/toolkit";
import { simulatorReducer, plantsReducer, selectionCardsReducer, mapReducer, simulationReducer } from "./slices";

export const store = configureStore({
  reducer: {
    simulator: simulatorReducer,
    plants: plantsReducer,
    selectionCards: selectionCardsReducer,
    map: mapReducer,
    simulation: simulationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

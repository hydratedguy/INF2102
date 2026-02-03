import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SimulatorState {
  inputValue: number;
  result: number;
}

const initialState: SimulatorState = {
  inputValue: 0,
  result: 0,
};

const simulatorSlice = createSlice({
  name: "simulator",
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<number>) {
      state.inputValue = action.payload;
    },
    calculateResult(state) {
      state.result = state.inputValue * 2; // regra de exemplo
    },
  },
});

export const { setInputValue, calculateResult } = simulatorSlice.actions;
export default simulatorSlice.reducer;

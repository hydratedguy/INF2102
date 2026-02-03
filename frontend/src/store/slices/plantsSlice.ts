import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api/axiosInstance";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface Plant {
  id: number;
  empresa: string | null;
}

interface PlantsState {
  items: Plant[];
  selected: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlantsState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

export const fetchPlants = createAsyncThunk(
  "plants/fetchPlants",
  async () => {
    const response = await api.get("/plants");
    return response.data as Plant[];
  }
);

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    setSelectedPlant(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPlants.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load plants list.";
      });
  },
});

export const { setSelectedPlant } = plantsSlice.actions;
export default plantsSlice.reducer;

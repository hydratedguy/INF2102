import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api/axiosInstance";

// Types matching backend schemas
interface LogisticsCost {
    distance_km: number;
    trips_per_day: number;
    cost_per_trip: number;
    total_daily_cost: number;
}

interface ProcessingCosts {
    pre_tratamento_capex: number;
    pre_tratamento_opex: number;
    biodigestao_capex: number;
    biodigestao_opex: number;
    purificacao_capex: number;
    purificacao_opex: number;
    pos_processamento_capex: number;
    pos_processamento_opex: number;
    digestato_capex: number;
    digestato_opex: number;
    co2_capex: number;
    co2_opex: number;
}

export interface SimulationResult {
    biogas_m3_day: number;
    biomethane_m3_day: number;
    raw_material_logistics: LogisticsCost;
    biomethane_logistics: LogisticsCost;
    processing_costs: ProcessingCosts;
    total_capex: number;
    total_opex_annual: number;
    total_logistics_annual: number;
    gross_revenue_daily: number;
    gross_revenue_annual: number;
    icms_rate: number;
    icms_description: string;
    icms_annual: number;
    net_revenue_annual: number;
    annual_profit: number;
    payback_years: number;
    raw_material_acquisition_annual: number;
    capex_from_plant: boolean;
}

export interface SimulationInput {
    source_id?: number;
    source_type?: "aterro" | "ecoparque" | "usinas_alcool";
    raw_material_type?: string;
    raw_material_quantity_ton_day?: number;
    plant_id: number;
    transport_raw_material_type?: string;
    transport_biomethane_type: string;
    destination_id: number;
    biomethane_price_per_m3: number;
    purificacao_tecnologia?: string;
    pos_processamento_estado?: string;
}

interface SimulationState {
    isRunning: boolean;
    result: SimulationResult | null;
    error: string | null;
}

const initialState: SimulationState = {
    isRunning: false,
    result: null,
    error: null,
};

// Async thunk to run simulation
export const runSimulation = createAsyncThunk(
    "simulation/run",
    async (input: SimulationInput, { rejectWithValue }) => {
        try {
            const response = await api.post<SimulationResult>("/simulation/run", input);
            return response.data;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { detail?: string } } };
                return rejectWithValue(axiosError.response?.data?.detail || "Simulation failed");
            }
            return rejectWithValue("Simulation failed");
        }
    }
);

const simulationSlice = createSlice({
    name: "simulation",
    initialState,
    reducers: {
        clearSimulation(state) {
            state.result = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(runSimulation.pending, (state) => {
                state.isRunning = true;
                state.error = null;
            })
            .addCase(runSimulation.fulfilled, (state, action) => {
                state.isRunning = false;
                state.result = action.payload;
            })
            .addCase(runSimulation.rejected, (state, action) => {
                state.isRunning = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSimulation } = simulationSlice.actions;
export default simulationSlice.reducer;

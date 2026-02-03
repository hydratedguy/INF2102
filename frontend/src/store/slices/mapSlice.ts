import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MapMarkerData, MarkerFilter } from "../../types/map";
import api from "../../services/api/axiosInstance";

interface PontosEntregaResponse {
  id: number;
  nome: string | null;
  estado: string | null;
  municipio: string | null;
  transporta: string | null;
  segmento: string | null;
  categoria: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface AuthorizedInfo {
  id: number;
  capacidade_nm3_d: number | null;
  link_aea: string | null;
  link_ao: string | null;
  n_da_autorizacao_aea: string | null;
  n_da_autorizacao_ao: string | null;
}

interface PendingInfo {
  id: number;
  capacidade_de_producao_nm_dia: number | null;
  categoria_materia_prima: string | null;
  fonte_1: string | null;
  fonte_2: string | null;
  investimento: string | null;
  previsao_de_conclusao_de_obra: string | null;
  tipo_de_autorizacao: string | null;
  tipo_localizacao: string | null;
  concluida: string | null;
  status: string | null;
}

interface PlantResponse {
  id: number;
  cnpj: string | null;
  empresa: string | null;
  municipio: string | null;
  uf: string | null;
  lat: number | null;
  long: number | null;
  materia_prima: string | null;
  active: boolean;
  authorized_info: AuthorizedInfo | null;
  pending_info: PendingInfo | null;
}

export interface AterrosSanitariosResponse {
  id: number;
  estado: string | null;
  municipio: string | null;
  nome: string | null;
  lat: number | null;
  long: number | null;
  operador: string | null;
  observacao: string | null;
  volume_recebido_toneladas_dia: number | null;
  porte: string | null;
  data_abertura: string | null;
  fonte_1: string | null;
  fonte_2: string | null;
  fonte_3: string | null;
  m3_biomethane_per_ton_rsu: number | null;
  active: boolean;
}

export interface EcoparqueResponse {
  id: number;
  nome: string | null;
  lat: number | null;
  long: number | null;
  tipo_localizacao: string | null;
  empresa: string | null;
  municipio: string | null;
  estado: string | null;
  fonte: string | null;
  active: boolean;
}

export interface UsinasAlcoolResponse {
  id: number;
  uf: string | null;
  unidade: string | null;
  perfil: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface MapState {
  markers: MapMarkerData[];
  filters: MarkerFilter;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch destinations (Pontos Entrega) from API
export const fetchDestinations = createAsyncThunk(
  "map/fetchDestinations",
  async () => {
    const response = await api.get<PontosEntregaResponse[]>("/pontos-entrega/");
    return response.data
      .filter((d) => d.latitude !== null && d.longitude !== null)
      .map((dest): MapMarkerData => {
        const stateMun = [dest.estado, dest.municipio].filter(Boolean).join(" - ");
        return {
          id: `dest-${dest.id}`,
          type: "destinacao",
          name: dest.nome || "Ponto de Entrega",
          lat: dest.latitude || 0,
          lng: dest.longitude || 0,
          details: {
            "Transportadora": dest.transporta || "N/A",
            "Estado - Município": stateMun || "N/A",
            "Segmento": dest.segmento || "N/A",
          },
        };
      });
  }
);

const initialState: MapState = {
  markers: [],
  filters: {
    materiaPrima: true,
    usina: true,
    destinacao: true,
  },
  searchQuery: "",
  loading: false,
  error: null,
};

// Async thunk to fetch plants (Usinas) from API
export const fetchPlants = createAsyncThunk(
  "map/fetchPlants",
  async () => {
    const response = await api.get<PlantResponse[]>("/plants/");
    return response.data
      .filter((p) => p.lat !== null && p.long !== null)
      .map((p): MapMarkerData => ({
        id: `plant-${p.id}`,
        type: "usina",
        name: p.empresa || p.municipio || "Sem nome",
        lat: p.lat!,
        lng: p.long!,
        details: {
          ...(p.empresa && { Empresa: p.empresa }),
          ...(p.municipio && p.uf ? { "Município - UF": `${p.municipio} - ${p.uf}` } : {}),
          ...(p.materia_prima && { "Matéria Prima": p.materia_prima }),
          // Authorized Info
          ...(p.authorized_info && {
            ...(p.authorized_info.capacidade_nm3_d && { "Capacidade (Nm³/d)": p.authorized_info.capacidade_nm3_d.toString() }),
            ...(p.authorized_info.n_da_autorizacao_aea && { "Autorização AEA": p.authorized_info.n_da_autorizacao_aea }),
            ...(p.authorized_info.n_da_autorizacao_ao && { "Autorização AO": p.authorized_info.n_da_autorizacao_ao }),
          }),
          // Pending Info
          ...(p.pending_info && {
            ...(p.pending_info.capacidade_de_producao_nm_dia && { "Capacidade (Nm³/dia)": p.pending_info.capacidade_de_producao_nm_dia.toString() }),
            ...(p.pending_info.previsao_de_conclusao_de_obra && { "Previsão Conclusão": p.pending_info.previsao_de_conclusao_de_obra }),
            ...(p.pending_info.investimento && { Investimento: p.pending_info.investimento }),
            ...(p.pending_info.status && { Status: p.pending_info.status }),
            ...(p.pending_info.concluida && { Concluída: p.pending_info.concluida }),
          }),
        },
      }));
  }
);

export const fetchAterrosSanitarios = createAsyncThunk(
  "map/fetchAterrosSanitarios",
  async () => {
    const response = await api.get<AterrosSanitariosResponse[]>("/aterros-sanitarios/");
    return response.data.map((item): MapMarkerData => {
      const stateMun = [item.estado, item.municipio].filter(Boolean).join(" - ");
      const details: Record<string, string> = {
        "Nome": item.nome || "Aterro Sanitário",
        "Município - UF": stateMun || "N/A",
        "Operador": item.operador || "N/A",
        "Porte": item.porte || "N/A",
        "Volume Recebido (t/d)": item.volume_recebido_toneladas_dia?.toString() || "N/A",
        "Data Abertura": item.data_abertura || "N/A",
      };
      return {
        id: `aterro-${item.id}`,
        type: "materiaPrima",
        name: item.nome || "Aterro Sanitário",
        lat: item.lat || 0,
        lng: item.long || 0,
        details: details,
      };
    });
  }
);

export const fetchEcoparques = createAsyncThunk(
  "map/fetchEcoparques",
  async () => {
    const response = await api.get<EcoparqueResponse[]>("/ecoparques/");
    return response.data.map((item): MapMarkerData => {
      const stateMun = [item.estado, item.municipio].filter(Boolean).join(" - ");
      const details: Record<string, string> = {
        "Nome": item.nome || "Ecoparque",
        "Município - UF": stateMun || "N/A",
        "Empresa": item.empresa || "N/A",
        "Tipo Localização": item.tipo_localizacao || "N/A",
        "Fonte": item.fonte || "N/A",
      };
      return {
        id: `ecoparques-${item.id}`,
        type: "materiaPrima",
        name: item.nome || "Ecoparque",
        lat: item.lat || 0,
        lng: item.long || 0,
        details: details,
      };
    });
  }
);

export const fetchUsinasAlcool = createAsyncThunk(
  "map/fetchUsinasAlcool",
  async () => {
    const response = await api.get<UsinasAlcoolResponse[]>("/usinas-alcool/");
    return response.data
      .filter((item) => item.latitude !== null && item.longitude !== null)
      .map((item): MapMarkerData => {
        const details: Record<string, string> = {
          "Unidade": item.unidade || "Usina de Álcool",
          "UF": item.uf || "N/A",
          "Perfil": item.perfil || "N/A",
        };
        return {
          id: `usinas-alcool-${item.id}`,
          type: "materiaPrima",
          name: item.unidade || "Usina de Álcool",
          lat: item.latitude || 0,
          lng: item.longitude || 0,
          details: details,
        };
      });
  }
);

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMarkers(state, action: PayloadAction<MapMarkerData[]>) {
      state.markers = action.payload;
    },
    addMarkers(state, action: PayloadAction<MapMarkerData[]>) {
      state.markers = [...state.markers, ...action.payload];
    },
    setFilter(
      state,
      action: PayloadAction<{ type: keyof MarkerFilter; value: boolean }>
    ) {
      state.filters[action.payload.type] = action.payload.value;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        // Add destinations to markers (keeping other types)
        const nonDestinations = state.markers.filter((m) => m.type !== "destinacao");
        state.markers = [...nonDestinations, ...action.payload];
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch destinations";
      })
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false;
        // Add plants to markers (keeping other types)
        const nonPlants = state.markers.filter((m) => m.type !== "usina");
        state.markers = [...nonPlants, ...action.payload];
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch plants";
      })
      .addCase(fetchAterrosSanitarios.fulfilled, (state, action) => {
        state.loading = false;
        // Add Aterros to markers, removing any existing ones to avoid duplicates/stale data
        const nonAterros = state.markers.filter((m) => !m.id.startsWith("aterro-"));
        state.markers = [...nonAterros, ...action.payload];
      })
      .addCase(fetchEcoparques.fulfilled, (state, action) => {
        state.loading = false;
        // Add Ecoparques to markers, removing any existing ones
        const nonEcoparques = state.markers.filter((m) => !m.id.startsWith("ecoparques-"));
        state.markers = [...nonEcoparques, ...action.payload];
      })
      .addCase(fetchUsinasAlcool.fulfilled, (state, action) => {
        state.loading = false;
        // Add Usinas Alcool to markers, removing any existing ones
        const nonUsinasAlcool = state.markers.filter((m) => !m.id.startsWith("usinas-alcool-"));
        state.markers = [...nonUsinasAlcool, ...action.payload];
      });
  },
});

export const { setMarkers, addMarkers, setFilter, setSearchQuery } = mapSlice.actions;
export default mapSlice.reducer;

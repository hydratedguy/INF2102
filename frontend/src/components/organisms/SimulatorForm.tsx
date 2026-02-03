import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Grid,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addSelectedItem,
  removeSelectedItem,
  setDropdownValue,
} from "../../store/slices/selectionCardsSlice";
import {
  setFilter, setSearchQuery, fetchDestinations,
  fetchPlants,
  fetchAterrosSanitarios,
  fetchEcoparques,
  fetchUsinasAlcool,
} from "../../store/slices/mapSlice";
import { runSimulation, clearSimulation } from "../../store/slices/simulationSlice";
import type { SimulationInput } from "../../store/slices/simulationSlice";
import SelectionCard from "./SelectionCard";
import InteractiveMap from "./InteractiveMap";
import { MapFilters } from "../molecules";
import type { MapMarkerData, MarkerType } from "../../types/map";

// Transport options based on research data with details
interface TransportOption {
  id: string;
  label: string;
  costPerKm: number;
  capacity: number;
  capacityUnit: string;
}

const transporteMPOptions: TransportOption[] = [
  { id: "CARRETA_BASCULANTE", label: "Carreta Basculante (RSU)", costPerKm: 7.5, capacity: 25, capacityUnit: "ton" },
  { id: "CAMINHAO_TANQUE_VACUO", label: "Caminhão Tanque-Vácuo (Dejetos)", costPerKm: 6.5, capacity: 20, capacityUnit: "ton" },
  { id: "CAMINHAO_TANQUE", label: "Caminhão Tanque (Vinhaça)", costPerKm: 6.0, capacity: 27.5, capacityUnit: "ton" },
];

const transporteBiometanoOptions: TransportOption[] = [
  { id: "CAMINHAO_GNC", label: "Caminhão GNC (Comprimido)", costPerKm: 0.00504, capacity: 4000, capacityUnit: "Nm³" },
  { id: "CAMINHAO_GNL", label: "Caminhão GNL (Liquefeito)", costPerKm: 0.000473, capacity: 10000, capacityUnit: "Nm³" },
  { id: "DUTO", label: "Duto (Gasoduto)", costPerKm: 0.005, capacity: Infinity, capacityUnit: "Nm³" },
];

// Get transport details for display
const getTransportMPDetails = (id: string): string => {
  const opt = transporteMPOptions.find(o => o.id === id);
  if (!opt) return "";
  return `R$ ${opt.costPerKm.toFixed(2)}/km • ${opt.capacity} ${opt.capacityUnit}/viagem`;
};

const getTransportBioDetails = (id: string): string => {
  const opt = transporteBiometanoOptions.find(o => o.id === id);
  if (!opt) return "";
  if (opt.capacity === Infinity) return `R$ ${opt.costPerKm.toFixed(4)}/Nm³/km • Capacidade ilimitada`;
  return `R$ ${opt.costPerKm.toFixed(4)}/Nm³/km • ${opt.capacity.toLocaleString("pt-BR")} ${opt.capacityUnit}/viagem`;
};

// Map marker types to card keys
const markerTypeToCard: Record<MarkerType, "materiaPrima" | "usina" | "destinacao"> = {
  materiaPrima: "materiaPrima",
  usina: "usina",
  destinacao: "destinacao",
};

// Helper to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

// Helper to format number
const formatNumber = (value: number, decimals = 0) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: decimals }).format(value);

export default function SimulatorForm() {
  const dispatch = useAppDispatch();
  const selectionCards = useAppSelector((state) => state.selectionCards);
  const { markers, filters, searchQuery } = useAppSelector((state) => state.map);
  const simulation = useAppSelector((state) => state.simulation);

  // Local state for transport dropdowns
  const [transporteMP, setTransporteMP] = useState<string>("CARRETA_BASCULANTE");
  const [transporteBio, setTransporteBio] = useState<string>("CAMINHAO_GNC");

  // Modal state for calculation info
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    dispatch(fetchDestinations());
    dispatch(fetchPlants());
    dispatch(fetchAterrosSanitarios());
    dispatch(fetchEcoparques());
    dispatch(fetchUsinasAlcool());
  }, [dispatch]);

  const handleDropdownSelect = (
    card: "transporteMP" | "transporteBiometano",
    value: string
  ) => {
    const options = card === "transporteMP" ? transporteMPOptions : transporteBiometanoOptions;
    const option = options.find((o) => o.id === value);
    if (option) {
      // Clear previous selections for transport (only allow one)
      selectionCards[card].selectedItems.forEach((item) => {
        dispatch(removeSelectedItem({ card, itemId: item.id }));
      });
      dispatch(addSelectedItem({ card, item: option }));
      dispatch(setDropdownValue({ card, value }));

      if (card === "transporteMP") {
        setTransporteMP(value);
      } else {
        setTransporteBio(value);
      }
    }
  };

  const handleMarkerClick = (marker: MapMarkerData) => {
    const card = markerTypeToCard[marker.type];

    // Check if already selected
    const isAlreadySelected = selectionCards[card].selectedItems.some(
      (item) => item.id === marker.id
    );

    if (isAlreadySelected) {
      // Remove selection
      dispatch(removeSelectedItem({ card, itemId: marker.id }));
    } else {
      // For simplicity, only allow one selection per card type
      // Remove any existing selection first (to maintain single selection behavior)
      selectionCards[card].selectedItems.forEach((item) => {
        dispatch(removeSelectedItem({ card, itemId: item.id }));
      });

      // Add new selection
      dispatch(
        addSelectedItem({
          card,
          item: { id: marker.id, label: marker.name },
        })
      );

      // Auto-select transport based on source type (matéria prima)
      if (card === "materiaPrima") {
        if (marker.id.startsWith("usinas-alcool-")) {
          // Vinhaça → Caminhão Tanque
          handleDropdownSelect("transporteMP", "CAMINHAO_TANQUE");
        } else if (marker.id.startsWith("aterro-") || marker.id.startsWith("ecoparques-")) {
          // RSU → Carreta Basculante
          handleDropdownSelect("transporteMP", "CARRETA_BASCULANTE");
        }
      }
    }
  };

  const handleFilterChange = (type: MarkerType, checked: boolean) => {
    dispatch(setFilter({ type, value: checked }));
  };

  // Check if we can run simulation
  const canRunSimulation = useMemo(() => {
    // We need at least a Plant and a Destination
    // Source is now optional
    const hasUsina = selectionCards.usina.selectedItems.length > 0;
    const hasDestinacao = selectionCards.destinacao.selectedItems.length > 0;
    return hasUsina && hasDestinacao;
  }, [selectionCards]);

  // Run simulation
  const handleRunSimulation = () => {
    // Get selected IDs
    const materiaPrimaId = selectionCards.materiaPrima.selectedItems[0]?.id;
    const usinaId = selectionCards.usina.selectedItems[0]?.id;
    const destinacaoId = selectionCards.destinacao.selectedItems[0]?.id;

    if (!usinaId || !destinacaoId) return;

    // Parse IDs based on actual marker formats from mapSlice:
    // - aterro-{id} or ecoparques-{id} or usinas-alcool-{id}
    // - plant-{id}
    // - dest-{id}

    // Parse source (materia prima) - OPTIONAL
    let sourceType: "aterro" | "ecoparque" | "usinas_alcool" | undefined = undefined;
    let sourceId: number | undefined = undefined;

    if (materiaPrimaId) {
      if (materiaPrimaId.startsWith("aterro-")) {
        sourceType = "aterro";
        sourceId = parseInt(materiaPrimaId.replace("aterro-", ""), 10);
      } else if (materiaPrimaId.startsWith("ecoparques-")) {
        sourceType = "ecoparque";
        sourceId = parseInt(materiaPrimaId.replace("ecoparques-", ""), 10);
      } else if (materiaPrimaId.startsWith("usinas-alcool-")) {
        sourceType = "usinas_alcool";
        sourceId = parseInt(materiaPrimaId.replace("usinas-alcool-", ""), 10);
      }
    }

    // Parse plant ID
    const plantId = parseInt(usinaId.replace("plant-", ""), 10);

    // Parse destination ID (format: dest-{id})
    const destId = parseInt(destinacaoId.replace("dest-", ""), 10);

    const rawMaterialType: SimulationInput["raw_material_type"] =
      sourceType === "usinas_alcool"
        ? "VINHACA"
        : sourceType
        ? "RSU"
        : undefined;

    const input: SimulationInput = {
      source_id: sourceId,
      source_type: sourceType,
      raw_material_type: rawMaterialType, // Determined from source type
      raw_material_quantity_ton_day: sourceType ? 320 : 0, // Default only if source exists
      plant_id: plantId,
      transport_raw_material_type: sourceType ? transporteMP : undefined,
      transport_biomethane_type: transporteBio,
      destination_id: destId,
      biomethane_price_per_m3: 3.5,
    };

    dispatch(runSimulation(input));
  };

  // Filter markers by search query
  const filteredMarkers = searchQuery
    ? markers.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : markers;

  // Determine layout mode based on whether we have simulation results
  const hasResults = simulation.result !== null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        height: hasResults ? "auto" : "100%",
        minHeight: "100%",
        overflow: hasResults ? "visible" : "hidden",
        pb: 2
      }}
    >
      {/* Selection Cards Row */}
      <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap" sx={{ flexShrink: 0 }}>
        <SelectionCard
          title="Matéria Prima"
          isMapSelection
          selectedItems={selectionCards.materiaPrima.selectedItems}
          onRemoveItem={(id) =>
            dispatch(removeSelectedItem({ card: "materiaPrima", itemId: id }))
          }
        />

        <SelectionCard
          title="Transporte MP"
          subtitle={getTransportMPDetails(transporteMP)}
          dropdownLabel="Selecionar transporte"
          dropdownOptions={transporteMPOptions}
          dropdownValue={transporteMP}
          onDropdownChange={(value) => handleDropdownSelect("transporteMP", value)}
          selectedItems={selectionCards.transporteMP.selectedItems}
          onRemoveItem={(id) =>
            dispatch(removeSelectedItem({ card: "transporteMP", itemId: id }))
          }
        />

        <SelectionCard
          title="Usina"
          isMapSelection
          selectedItems={selectionCards.usina.selectedItems}
          onRemoveItem={(id) =>
            dispatch(removeSelectedItem({ card: "usina", itemId: id }))
          }
        />

        <SelectionCard
          title="Transporte Biometano"
          subtitle={getTransportBioDetails(transporteBio)}
          dropdownLabel="Selecionar transporte"
          dropdownOptions={transporteBiometanoOptions}
          dropdownValue={transporteBio}
          onDropdownChange={(value) =>
            handleDropdownSelect("transporteBiometano", value)
          }
          selectedItems={selectionCards.transporteBiometano.selectedItems}
          onRemoveItem={(id) =>
            dispatch(
              removeSelectedItem({ card: "transporteBiometano", itemId: id })
            )
          }
        />

        <SelectionCard
          title="Destinação"
          isMapSelection
          selectedItems={selectionCards.destinacao.selectedItems}
          onRemoveItem={(id) =>
            dispatch(removeSelectedItem({ card: "destinacao", itemId: id }))
          }
        />

        {/* Run Simulation Button */}
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={simulation.isRunning ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
            onClick={handleRunSimulation}
            disabled={!canRunSimulation || simulation.isRunning}
            sx={{ minWidth: 180, height: 48 }}
          >
            {simulation.isRunning ? "Simulando..." : "Simular"}
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {simulation.error && (
        <Alert severity="error" onClose={() => dispatch(clearSimulation())}>
          {simulation.error}
        </Alert>
      )}

      {/* Simulation Results or Loading */}
      {simulation.isRunning ? (
        <Paper sx={{ p: 4, bgcolor: "grey.50", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <CircularProgress size={40} />
          <Typography color="text.secondary">Executando simulação...</Typography>
        </Paper>
      ) : simulation.result ? (
        <Paper sx={{ p: 2, bgcolor: "grey.50", flexShrink: 0 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h6">
              Resultado da Simulação
            </Typography>
            <IconButton
              size="small"
              onClick={() => setInfoModalOpen(true)}
              sx={{ color: "text.secondary", ml: 1 }}
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => dispatch(clearSimulation())}
              sx={{ color: "text.secondary", ml: "auto" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            {/* Production */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Produção</Typography>
              <Typography variant="body2">
                Biogás: <strong>{formatNumber(simulation.result.biogas_m3_day)} m³/dia</strong>
              </Typography>
              <Typography variant="body2">
                Biometano: <strong>{formatNumber(simulation.result.biomethane_m3_day)} Nm³/dia</strong>
              </Typography>
            </Grid>

            {/* Costs */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Custos</Typography>
              <Typography variant="body2">
                CAPEX Total{simulation.result.capex_from_plant && (
                  <Tooltip title="Valor de investimento informado pela usina selecionada" arrow placement="top">
                    <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'text-bottom', color: 'primary.main', cursor: 'help' }} />
                  </Tooltip>
                )}: <strong>{formatCurrency(simulation.result.total_capex)}</strong>
              </Typography>
              <Typography variant="body2">
                OPEX Anual: <strong>{formatCurrency(simulation.result.total_opex_annual)}</strong>
              </Typography>
              <Typography variant="body2">
                Logística Anual: <strong>{formatCurrency(simulation.result.total_logistics_annual)}</strong>
              </Typography>
              <Typography variant="body2">
                Aquisição MP Anual: <strong>{formatCurrency(simulation.result.raw_material_acquisition_annual)}</strong>
              </Typography>
            </Grid>

            {/* Revenue */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Receita</Typography>
              <Typography variant="body2">
                Receita Bruta Anual: <strong>{formatCurrency(simulation.result.gross_revenue_annual)}</strong>
              </Typography>
              <Typography variant="body2">
                ICMS ({(simulation.result.icms_rate * 100).toFixed(1)}%)
                <Tooltip title={simulation.result.icms_description} arrow placement="top">
                  <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'text-bottom', color: 'text.secondary', cursor: 'help' }} />
                </Tooltip>: <strong>{formatCurrency(simulation.result.icms_annual)}</strong>
              </Typography>
              <Typography variant="body2">
                Receita Líquida: <strong>{formatCurrency(simulation.result.net_revenue_annual)}</strong>
              </Typography>
            </Grid>

            {/* Summary */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Resultado</Typography>
              <Typography variant="body2">
                Lucro Anual: <strong style={{ color: simulation.result.annual_profit > 0 ? 'green' : 'red' }}>
                  {formatCurrency(simulation.result.annual_profit)}
                </strong>
              </Typography>
              <Typography variant="body2">
                {/* Payback: <strong>{simulation.result.payback_years === 999 ? "∞" : `${formatNumber(simulation.result.payback_years, 1)} anos`}</strong> */}
              </Typography>
            </Grid>
          </Grid>

          {/* Logistics Details */}
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">Transporte Matéria Prima</Typography>
              <Typography variant="body2">
                Distância: {formatNumber(simulation.result.raw_material_logistics.distance_km, 1)} km |
                Viagens/dia: {simulation.result.raw_material_logistics.trips_per_day} |
                Custo/dia: {formatCurrency(simulation.result.raw_material_logistics.total_daily_cost)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">Transporte Biometano</Typography>
              <Typography variant="body2">
                Distância: {formatNumber(simulation.result.biomethane_logistics.distance_km, 1)} km |
                Viagens/dia: {simulation.result.biomethane_logistics.trips_per_day} |
                Custo/dia: {formatCurrency(simulation.result.biomethane_logistics.total_daily_cost)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : null}

      {/* Map Section */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          p: 2,
          border: "1px solid",
          borderColor: "grey.300",
          // Always use a viewport-based height for the map
          // When results or loading: fixed 600px, when no results/loading: fill remaining space
          height: (hasResults || simulation.isRunning) ? 600 : "calc(100vh - 200px)",
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <MapFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          searchValue={searchQuery}
          onSearchChange={(value) => dispatch(setSearchQuery(value))}
        />
        <InteractiveMap
          markers={filteredMarkers}
          filters={filters}
          onMarkerClick={handleMarkerClick}
          height="100%"
          selectedIds={[
            ...selectionCards.materiaPrima.selectedItems.map(i => i.id),
            ...selectionCards.usina.selectedItems.map(i => i.id),
            ...selectionCards.destinacao.selectedItems.map(i => i.id),
          ]}
        />
      </Box>

      {/* Calculation Info Modal */}
      <Dialog
        open={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        maxWidth="md"
        fullWidth
        keepMounted
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Como os valores são calculados
          <IconButton onClick={() => setInfoModalOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* Production Section */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Produção
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Biogás (m³/dia):</strong> Calculado com base na quantidade de matéria-prima (ton/dia)
            multiplicada pelo rendimento de biogás específico do tipo de resíduo (m³/ton).
            O rendimento varia conforme o tipo: RSU (~100 m³/ton), dejetos suínos (~40 m³/ton),
            vinhaça (~20 m³/ton).
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Biometano (Nm³/dia):</strong> Volume de biogás multiplicado pela eficiência de
            purificação (tipicamente 95-98%) e pelo fator de conversão para biometano (considerando
            concentração de metano no biogás, geralmente 55-65%).
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Costs Section */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Custos
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>CAPEX Total:</strong> Se a usina selecionada possui informação de investimento cadastrada,
            este valor é utilizado diretamente (indicado pelo ícone azul). Caso contrário, é calculado como
            soma dos investimentos em todas as etapas do processo:
            <br />• Pré-tratamento: Equipamentos de recepção, triagem e preparação da matéria-prima
            <br />• Biodigestão: Biodigestores, sistemas de agitação e aquecimento
            <br />• Purificação: Sistema de upgrading para remoção de CO₂ e H₂S
            <br />• Pós-processamento: Compressão, liquefação ou injeção em duto
            <br />• Digestato: Tratamento e armazenamento do digestato
            <br />• CO₂: Captura e armazenamento do CO₂ (se aplicável)
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>OPEX Anual:</strong> Custos operacionais anuais incluindo mão-de-obra, energia,
            manutenção, insumos químicos e outros custos operacionais de cada etapa do processo.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Logística Anual:</strong> Custo total de transporte = (Custo MP + Custo Biometano) × 365 dias
            <br />• Custo diário MP = Viagens/dia × Distância × 2 (ida e volta) × Custo/km
            <br />• Custo diário Biometano = Viagens/dia × Distância × 2 × Custo/km (ou Custo/Nm³/km para dutos)
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Aquisição MP Anual:</strong> Custo de aquisição da matéria-prima = Quantidade (ton/dia) × Preço por tonelada × 365 dias
            <br />• O preço varia conforme o tipo de resíduo (RSU, dejetos, vinhaça)
            <br />• Alguns resíduos podem ter custo negativo (receita por receber o material)
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Revenue Section */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Receita
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Receita Bruta Anual:</strong> Volume de biometano (Nm³/dia) × Preço de venda (R$/Nm³) × 365 dias
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>ICMS:</strong> Imposto estadual sobre circulação de mercadorias. A alíquota varia
            conforme o estado de destino (geralmente entre 12% e 18%). Alguns estados oferecem
            incentivos fiscais para biometano.
            <br />• ICMS Anual = Receita Bruta × Alíquota ICMS
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Receita Líquida Anual:</strong> Receita Bruta - ICMS
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Results Section */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Resultado
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Lucro Anual:</strong> Receita Líquida - OPEX Anual - Logística Anual - Aquisição Matéria-Prima
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Payback:</strong> CAPEX Total ÷ Lucro Anual (em anos)
            <br />• Se o lucro for negativo ou zero, o payback é infinito (∞)
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Logistics Details Section */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Detalhes de Logística
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Distância:</strong> Calculada em linha reta (Haversine) entre os pontos de origem
            e destino, multiplicada por um fator de correção de 1.3 para aproximar a distância real por estradas.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Viagens/dia:</strong> Quantidade de matéria-prima ou biometano ÷ Capacidade do veículo
            <br />• Arredondado para cima para garantir transporte completo
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Custo/dia:</strong> Número de viagens × Distância × 2 (ida e volta) × Custo unitário do transporte
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

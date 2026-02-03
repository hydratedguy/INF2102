import { Box, Checkbox, FormControlLabel, TextField, InputAdornment, SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { MarkerFilter, MarkerType } from "../../types/map";
import { markerTypeLabels, markerTypeColors, markerTypeBgColors } from "../../types/map";

interface MapFiltersProps {
  filters: MarkerFilter;
  onFilterChange: (type: MarkerType, checked: boolean) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

// Custom SVG icons matching the map markers
const MateriaPrimaIcon = () => (
  <SvgIcon fontSize="small" viewBox="0 0 12 12">
    <path d="M2 10V12H12V10L9 7V2H7V7L2 10ZM4 4H6V2H4V4Z" />
  </SvgIcon>
);

const UsinaIcon = () => (
  <SvgIcon fontSize="small" viewBox="0 0 12 12">
    <path d="M0.75 9H2.25V5.25H3.75V9H5.25V3.75H6.75V9H8.25V2.25H9.75V9H11.25V0.75H0.75V9Z" />
  </SvgIcon>
);

const DestinacaoIcon = () => (
  <SvgIcon fontSize="small" viewBox="0 0 12 12">
    <path d="M6 1L0 6V12H4V8H8V12H12V6L6 1Z" />
  </SvgIcon>
);

const markerTypeIcons: Record<MarkerType, React.ReactNode> = {
  materiaPrima: <MateriaPrimaIcon />,
  usina: <UsinaIcon />,
  destinacao: <DestinacaoIcon />,
};

export default function MapFilters({
  filters,
  onFilterChange,
  searchValue,
  onSearchChange,
}: MapFiltersProps) {
  const filterTypes: MarkerType[] = ["materiaPrima", "usina", "destinacao"];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        px: 1,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        {filterTypes.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={filters[type]}
                onChange={(e) => onFilterChange(type, e.target.checked)}
                sx={{
                  color: markerTypeColors[type],
                  "&.Mui-checked": {
                    color: markerTypeColors[type],
                  },
                }}
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {markerTypeLabels[type]}
                <Box sx={{ color: markerTypeColors[type], display: "flex" }}>
                  {markerTypeIcons[type]}
                </Box>
              </Box>
            }
            sx={{
              border: "1px solid",
              borderColor: "transparent",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              mr: 0,
              bgcolor: markerTypeBgColors[type],
            }}
          />
        ))}
      </Box>

      <TextField
        size="small"
        placeholder="Pesquisar"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: "white",
          minWidth: 200,
        }}
      />
    </Box>
  );
}

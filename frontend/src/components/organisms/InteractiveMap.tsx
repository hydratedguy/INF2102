import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { Box, SvgIcon } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { markerIcons, selectedMarkerIcons } from "../../utils/mapIcons";
import type { MapMarkerData, MarkerFilter, MarkerType } from "../../types/map";
import { markerTypeLabels, markerTypeColors } from "../../types/map";

// Custom SVG icons matching the map markers
const MateriaPrimaIcon = () => (
  <SvgIcon sx={{ fontSize: 14 }} viewBox="0 0 12 12">
    <path d="M2 10V12H12V10L9 7V2H7V7L2 10ZM4 4H6V2H4V4Z" />
  </SvgIcon>
);

const UsinaIcon = () => (
  <SvgIcon sx={{ fontSize: 14 }} viewBox="0 0 12 12">
    <path d="M0.75 9H2.25V5.25H3.75V9H5.25V3.75H6.75V9H8.25V2.25H9.75V9H11.25V0.75H0.75V9Z" />
  </SvgIcon>
);

const DestinacaoIcon = () => (
  <SvgIcon sx={{ fontSize: 14 }} viewBox="0 0 12 12">
    <path d="M6 1L0 6V12H4V8H8V12H12V6L6 1Z" />
  </SvgIcon>
);

const markerTypeIcons: Record<MarkerType, React.ReactNode> = {
  materiaPrima: <MateriaPrimaIcon />,
  usina: <UsinaIcon />,
  destinacao: <DestinacaoIcon />,
};

interface InteractiveMapProps {
  markers: MapMarkerData[];
  filters: MarkerFilter;
  onMarkerClick: (marker: MapMarkerData) => void;
  height?: number | string;
  selectedIds?: string[]; // IDs of currently selected markers
}

export default function InteractiveMap({
  markers,
  filters,
  onMarkerClick,
  height = 550,
  selectedIds = [],
}: InteractiveMapProps) {
  // Filter markers based on active filters
  const filteredMarkers = markers.filter((marker) => filters[marker.type]);

  // Create a Set for O(1) lookup of selected IDs
  const selectedIdSet = new Set(selectedIds);

  // Center of Brazil
  const defaultCenter: [number, number] = [-10.0, -52.0];
  const defaultZoom = 4;

  return (
    <Box
      sx={{
        height,
        width: "100%",
        borderRadius: 0,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "grey.300",
        flex: 1,
        minHeight: 0,
        "& .custom-marker-icon": {
          background: "transparent",
          border: "none",
        },
        "& .selected-marker": {
          zIndex: 1000,
        },
      }}
    >
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredMarkers.map((marker) => {
          const isSelected = selectedIdSet.has(marker.id);
          const icon = isSelected ? selectedMarkerIcons[marker.type] : markerIcons[marker.type];

          return (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick(marker),
              }}
            >
              <Tooltip>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: markerTypeColors[marker.type] }}>
                    {markerTypeIcons[marker.type]}
                    <span style={{ fontSize: 12 }}>{markerTypeLabels[marker.type]}</span>
                    {isSelected && <span style={{ fontSize: 10, marginLeft: 4 }}>✓</span>}
                  </Box>
                  <span style={{ fontWeight: 600 }}>{marker.name}</span>
                  {marker.details && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, mt: 0.5 }}>
                      {Object.entries(marker.details).map(([key, value]) => (
                        <Box key={key} sx={{ display: "flex", gap: 0.5, fontSize: 11 }}>
                          <span style={{ fontWeight: 600, color: "#666" }}>{key}:</span>
                          <span>{value}</span>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}


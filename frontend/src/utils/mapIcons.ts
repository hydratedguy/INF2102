import L from "leaflet";
import type { MarkerType } from "../types/map";
import { markerTypeColors } from "../types/map";

// SVG icon for normal markers
const createSvgIcon = (color: string, iconPath: string): string => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z" fill="${color}"/>
  <circle cx="12" cy="12" r="8" fill="white"/>
  <g transform="translate(6, 6)" fill="${color}">
    ${iconPath}
  </g>
</svg>
`;

// SVG icon for selected markers - with golden ring and larger size
const createSelectedSvgIcon = (color: string, iconPath: string): string => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="32" height="44">
  <!-- Golden selection ring -->
  <circle cx="16" cy="14" r="14" fill="none" stroke="#FFD700" stroke-width="3"/>
  <!-- Main marker -->
  <g transform="translate(4, 2)">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z" fill="${color}" stroke="white" stroke-width="1"/>
    <circle cx="12" cy="12" r="8" fill="white"/>
    <g transform="translate(6, 6)" fill="${color}">
      ${iconPath}
    </g>
  </g>
</svg>
`;

// Icon paths for each type
const iconPaths: Record<MarkerType, string> = {
  // Factory/Industry icon for Matéria Prima
  materiaPrima: `<path d="M2 10V12H12V10L9 7V2H7V7L2 10ZM4 4H6V2H4V4Z" transform="scale(1)"/>`,
  // Building/Plant icon for Usina
  usina: `<path d="M1 12H3V7H5V12H7V5H9V12H11V3H13V12H15V1H1V12Z" transform="scale(0.75) translate(1, 1)"/>`,
  // Home/Destination icon for Destinação
  destinacao: `<path d="M6 1L0 6V12H4V8H8V12H12V6L6 1Z" transform="scale(1)"/>`,
};

export const createMarkerIcon = (type: MarkerType, selected: boolean = false): L.DivIcon => {
  const color = markerTypeColors[type];
  const iconPath = iconPaths[type];

  if (selected) {
    const svgString = createSelectedSvgIcon(color, iconPath);
    return L.divIcon({
      html: svgString,
      className: "custom-marker-icon selected-marker",
      iconSize: [32, 44],
      iconAnchor: [16, 44],
      popupAnchor: [0, -44],
    });
  }

  const svgString = createSvgIcon(color, iconPath);
  return L.divIcon({
    html: svgString,
    className: "custom-marker-icon",
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
};

// Pre-created icons for performance
export const markerIcons: Record<MarkerType, L.DivIcon> = {
  materiaPrima: createMarkerIcon("materiaPrima"),
  usina: createMarkerIcon("usina"),
  destinacao: createMarkerIcon("destinacao"),
};

export const selectedMarkerIcons: Record<MarkerType, L.DivIcon> = {
  materiaPrima: createMarkerIcon("materiaPrima", true),
  usina: createMarkerIcon("usina", true),
  destinacao: createMarkerIcon("destinacao", true),
};



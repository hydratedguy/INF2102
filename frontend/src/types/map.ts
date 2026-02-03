export type MarkerType = "materiaPrima" | "usina" | "destinacao";

export interface MapMarkerData {
  id: string;
  type: MarkerType;
  name: string;
  lat: number;
  lng: number;
  // Additional info for tooltip
  details?: Record<string, string>;
}

export interface MarkerFilter {
  materiaPrima: boolean;
  usina: boolean;
  destinacao: boolean;
}

export const markerTypeLabels: Record<MarkerType, string> = {
  materiaPrima: "Matéria Prima",
  usina: "Usina",
  destinacao: "Destinação",
};

export const markerTypeColors: Record<MarkerType, string> = {
  materiaPrima: "#4CAF50", // Green
  usina: "#E91E63", // Pink/Magenta
  destinacao: "#9C27B0", // Purple
};

export const markerTypeBgColors: Record<MarkerType, string> = {
  materiaPrima: "#E8F5E9", // Light green
  usina: "#FCE4EC", // Light pink
  destinacao: "#F3E5F5", // Light purple
};

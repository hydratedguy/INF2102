import { Box, Paper } from "@mui/material";
import { Text, Chip } from "../atoms";
import { Dropdown } from "../molecules";
import type { SelectOption } from "../atoms/Select";

export interface SelectedItem {
  id: string;
  label: string;
}

interface SelectionCardProps {
  title: string;
  // Subtitle for showing additional info (like transport details)
  subtitle?: string;
  // Dropdown props (optional)
  dropdownOptions?: SelectOption[];
  dropdownLabel?: string;
  dropdownValue?: string | null;
  onDropdownChange?: (value: string) => void;
  // Selected items
  selectedItems: SelectedItem[];
  onRemoveItem: (id: string) => void;
  // For map-based selection (placeholder)
  isMapSelection?: boolean;
}

export default function SelectionCard({
  title,
  subtitle,
  dropdownOptions,
  dropdownLabel = "Select",
  dropdownValue = null,
  onDropdownChange,
  selectedItems,
  onRemoveItem,
  isMapSelection = false,
}: SelectionCardProps) {
  const hasDropdown = dropdownOptions && dropdownOptions.length > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 2,
        flex: 1,
        minWidth: 150,
      }}
    >
      <Text variant="subtitle1" fontWeight={500} sx={{ mb: subtitle ? 0.5 : 2 }}>
        {title}
      </Text>

      {subtitle && (
        <Text variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
          {subtitle}
        </Text>
      )}

      {hasDropdown && onDropdownChange && (
        <Box sx={{ mb: 2 }}>
          <Dropdown
            label={dropdownLabel}
            options={dropdownOptions}
            value={dropdownValue}
            onChange={onDropdownChange}
          />
        </Box>
      )}

      {isMapSelection && !hasDropdown && (
        <Text variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Clique no mapa para selecionar itens
        </Text>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selectedItems.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            onRemove={() => onRemoveItem(item.id)}
          />
        ))}
      </Box>
    </Paper>
  );
}


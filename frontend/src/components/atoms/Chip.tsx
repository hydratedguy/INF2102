import { Chip as MuiChip } from "@mui/material";
import type { ChipProps as MuiChipProps } from "@mui/material/Chip";

interface ChipProps extends Omit<MuiChipProps, "onDelete"> {
  label: string;
  onRemove?: () => void;
}

export default function Chip({ label, onRemove, ...props }: ChipProps) {
  return (
    <MuiChip
      label={label}
      onDelete={onRemove}
      variant="outlined"
      size="small"
      sx={{
        borderRadius: "16px",
        ...props.sx,
      }}
      {...props}
    />
  );
}

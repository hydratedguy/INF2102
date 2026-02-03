import { Select as MuiSelect, MenuItem } from "@mui/material";
import type { SelectProps as MuiSelectProps } from "@mui/material/Select";

export interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps extends Omit<MuiSelectProps, "onChange"> {
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function Select({ options, onChange, ...props }: SelectProps) {
  return (
    <MuiSelect onChange={(e) => onChange(e.target.value as string)} {...props}>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}

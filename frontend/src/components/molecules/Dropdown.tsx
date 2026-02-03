import { FormControl } from "@mui/material";
import { Label, Select } from "../atoms";
import type { SelectOption } from "../atoms/Select";

interface DropdownProps {
  label: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  fullWidth = true,
}: DropdownProps) {
  return (
    <FormControl fullWidth={fullWidth} size="small">
      <Label>{label}</Label>
      <Select
        value={value ?? ""}
        label={label}
        options={options}
        onChange={onChange}
        size="small"
      />
    </FormControl>
  );
}

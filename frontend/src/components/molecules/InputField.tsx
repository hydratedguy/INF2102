import { Input } from "../atoms";
import type { TextFieldProps } from "@mui/material/TextField";

interface InputFieldProps extends Omit<TextFieldProps, "onChange"> {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  ...props
}: InputFieldProps) {
  return (
    <Input
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}

import { InputLabel } from "@mui/material";
import type { InputLabelProps } from "@mui/material/InputLabel";

interface LabelProps extends InputLabelProps {
  children: React.ReactNode;
}

export default function Label({ children, ...props }: LabelProps) {
  return <InputLabel {...props}>{children}</InputLabel>;
}

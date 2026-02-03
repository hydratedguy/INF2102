import { CircularProgress } from "@mui/material";
import type { CircularProgressProps } from "@mui/material/CircularProgress";

interface SpinnerProps extends CircularProgressProps {}

export default function Spinner({ size = 20, ...props }: SpinnerProps) {
  return <CircularProgress size={size} {...props} />;
}

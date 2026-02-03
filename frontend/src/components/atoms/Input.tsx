import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

type InputProps = TextFieldProps;

export default function Input(props: InputProps) {
  return <TextField {...props} />;
}

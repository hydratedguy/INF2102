import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material/Typography";

interface TextProps extends TypographyProps {
  children: React.ReactNode;
}

export default function Text({ children, ...props }: TextProps) {
  return <Typography {...props}>{children}</Typography>;
}

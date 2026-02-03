import { Container, Box } from "@mui/material";
import { Text } from "../atoms";
import { Header } from "../molecules";

interface SimulatorTemplateProps {
  title: string;
  children: React.ReactNode;
}

export default function SimulatorTemplate({ title, children }: SimulatorTemplateProps) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", display: "flex", flexDirection: "column" }}>
      <Box sx={{ bgcolor: "white", flexShrink: 0 }}>
        <Header />
      </Box>
      <Container maxWidth="xl" sx={{ flex: 1, display: "flex", flexDirection: "column", py: 2 }}>
        {title && (
          <Text variant="h4" gutterBottom>
            {title}
          </Text>
        )}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}


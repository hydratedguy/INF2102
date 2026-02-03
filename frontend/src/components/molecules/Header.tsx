import { Box } from "@mui/material";
import galpLogo from "../../assets/logo-svg.svg";

export default function Header() {
  return (
    <Box component="header">
      <Box
        sx={{
          height: 56,
          px: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={galpLogo}
          alt="Galp"
          style={{
            height: 48,
            width: "auto",
          }}
        />
      </Box>
      <Box
        sx={{
          height: 3,
          background: "linear-gradient(90deg, #FF4400 0%, #FF6600 15%, #FFaa66 50%, #FF6600 85%, #FF4400 100%)",
        }}
      />
    </Box>
  );
}

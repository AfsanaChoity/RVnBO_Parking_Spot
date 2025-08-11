import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export default function AuthCloseButton() {
  return (
    <IconButton
      aria-label="Close"
      component={RouterLink}
      to="/"
      replace
      sx={{
        position: "absolute",
        right: 16,
        top: 16,
        color: "grey.500",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 1)",
          color: "grey.700",
        },
        zIndex: 10,
      }}
    >
      <Close />
    </IconButton>
  );
}

import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function BackToLogin() {
  return (
    <Typography
      variant="body2"
      sx={{
        textAlign: "center",
        color: "text.secondary",
        mt: 2,
      }}
    >
      <Link
        to = "/auth/login"
        style={{
          color: "#468F9D",
          textDecoration: "none",
          fontSize: "0.875rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        ← Back to Login
      </Link>
    </Typography>
  )
}

import { Box } from "@mui/material"
import { Key } from "@mui/icons-material"

export default function AuthHeaderIcon({ icon: Icon = Key, color = "#468F9D" }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 3,
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon sx={{ color: color, fontSize: 28 }} />
      </Box>
    </Box>
  )
}

"use client"
import { TextField, Typography, Box } from "@mui/material"

export default function InputName({ value, onChange, label = "Name and Surname" }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 1,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter your full name"
        value={value}
        onChange={onChange}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "#fafafa",
          },
        }}
      />
    </Box>
  )
}

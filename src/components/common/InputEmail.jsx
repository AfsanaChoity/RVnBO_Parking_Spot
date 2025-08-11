import { TextField, Typography, Box } from "@mui/material"

export default function InputEmail({ value, onChange, label = "Email Address" }) {
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
        type="email"
        placeholder="Enter your email address"
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

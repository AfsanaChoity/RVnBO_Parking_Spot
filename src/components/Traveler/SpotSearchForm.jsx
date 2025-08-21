import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Grid,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FaCar } from 'react-icons/fa';
import dayjs from 'dayjs';

const SpotSearchForm = ({ location, setLocation, checkIn, setCheckIn, checkOut, setCheckOut, useLocalStorageDates = true }) => {

  // Initialize safe checkIn/checkOut from localStorage if available
  const safeCheckIn = checkIn || (useLocalStorageDates && localStorage.getItem('checkIn') ? dayjs(localStorage.getItem('checkIn')) : dayjs());
  const safeCheckOut = checkOut || (useLocalStorageDates && localStorage.getItem('checkOut') ? dayjs(localStorage.getItem('checkOut')) : dayjs());

  const handleCheckInChange = (newDate) => {
    setCheckIn(newDate);
    if (newDate) localStorage.setItem('checkIn', newDate.toISOString());
  };

  const handleCheckOutChange = (newDate) => {
    setCheckOut(newDate);
    if (newDate) localStorage.setItem('checkOut', newDate.toISOString());
  };

  // Calculate nights safely
  const nights = safeCheckOut && safeCheckIn ? safeCheckOut.diff(safeCheckIn, 'day') : 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 2,
          margin: "auto",
          backgroundColor: "#f2fbfd",
          maxWidth: 1600,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 0 }}
          sx={{
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            flexWrap: "wrap",
          }}
        >
          {/* Location */}
          <Grid item xs={12} md sx={{ flexBasis: { md: "25%" }, minWidth: 0 }}>
            <TextField
              fullWidth
              label="Enter City or Location"
              placeholder="e.g. Austin, Texas"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaCar style={{ color: "#000" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Check In */}
          <Grid item xs={12} md sx={{ flexBasis: { md: "25%" }, minWidth: 0 }}>
            <DatePicker
              label="Check In"
              value={safeCheckIn}
              onChange={handleCheckInChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          {/* Check Out */}
          <Grid item xs={12} md sx={{ flexBasis: { md: "25%" }, minWidth: 0 }}>
            <DatePicker
              label="Check Out"
              value={safeCheckOut}
              onChange={handleCheckOutChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          {/* Nights Display */}
          <Grid
            item
            xs={12}
            md
            sx={{
              flexBasis: { md: "" },
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                border: "1.5px solid #aaa",
                borderRadius: "28px",
                px: 4,
                py: 2,
                width: "100%",
                textAlign: "center",
                background: "#f2fbfd",
              }}
            >
              <Typography fontWeight={700}>
                {nights > 0
                  ? `${nights} Night${nights > 1 ? "s" : ""}`
                  : "0 Night"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default SpotSearchForm;

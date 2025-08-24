import { useState, useEffect } from "react";
import {
  Box, Container, Typography, TextField, Button,
  MenuItem, Select, InputAdornment
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useUpdateTravelerProfileMutation } from "../../redux/api/travelerApi";
import toast from "react-hot-toast";

const PHONE_PLACEHOLDERS = {
  "+1": "e.g., (555) 123-4567",
  "+44": "e.g., 07123 456789",
  "+91": "e.g., 91234 56789",
  "+86": "e.g., 138 0013 8000",
};

export default function AccountSetting() {
  const [profileData, setProfileData] = useState({
    fullName: "",
    phoneNumber: "",
    countryCode: "+1",
  });

  const [phoneError, setPhoneError] = useState("");

  // Store base64 Data URL for backend + use same string for preview
  const [imageDataUrl, setImageDataUrl] = useState(null);

  const [updateTravelerProfile, { isLoading: isUpdating }] =
    useUpdateTravelerProfileMutation();

  useEffect(() => {
    // nothing to clean up; Data URLs live in memory
  }, []);

  const handleInputChange = (field) => (event) => {
    const val = event.target.value;
    setProfileData((prev) => ({ ...prev, [field]: val }));
    if (field === "phoneNumber" && phoneError) setPhoneError("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      // e.target.result is a base64 Data URL (what your backend wants)
      setImageDataUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const normalizePhone = (code, num) => {
    const cleanCode = String(code || "").replace(/\s+/g, "");
    const cleanNum = String(num || "").replace(/\D+/g, "");
    const withPlus = cleanCode.startsWith("+") ? cleanCode : `+${cleanCode}`;
    return cleanNum ? `${withPlus}${cleanNum}` : "";
  };

  // E.164-ish: + and 8–15 digits total
  const isValidPhone = (full) => /^\+\d{8,15}$/.test(full);

  const handleUpdateProfile = async () => {
    const maybeName = profileData.fullName?.trim();
    const fullPhone = normalizePhone(profileData.countryCode, profileData.phoneNumber);

    const hasName = Boolean(maybeName);
    const hasPhoneInput = Boolean(profileData.phoneNumber?.trim());
    const hasPhone = Boolean(fullPhone);
    const hasImage = Boolean(imageDataUrl);

    if (hasPhoneInput && !isValidPhone(fullPhone)) {
      setPhoneError("Please enter a valid phone number.");
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!hasName && !hasPhoneInput && !hasImage) {
      toast("Nothing to update.");
      return;
    }

    // ✅ Send JSON to match your backend expectations
    const payload = {};
    if (hasName) payload.name = maybeName;
    if (hasPhone) payload.phoneNumber = fullPhone;
    if (hasImage) payload.image = imageDataUrl;

    try {
      await updateTravelerProfile(payload).unwrap();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleReset = () => {
    setProfileData({ fullName: "", phoneNumber: "", countryCode: "+1" });
    setPhoneError("");
    setImageDataUrl(null);
  };

  return (
    <div>
      <Container sx={{ py: 4 }}>
        <Box>
          {/* Profile Picture */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontWeight: 500 }}>
              Your Profile Picture
            </Typography>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Box
                component="label"
                sx={{
                  width: 120,
                  height: 120,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: imageDataUrl ? "transparent" : "#f9f9f9",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                {imageDataUrl ? (
                  <img
                    src={imageDataUrl}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <>
                    <PhotoCamera sx={{ fontSize: 32, color: "#999", mb: 1 }} />
                    <Typography variant="caption" sx={{ color: "#666", textAlign: "center", px: 1 }}>
                      Upload your photo
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography variant="body1" sx={{ mb: 1, color: "#333", fontWeight: 500 }}>
                Full name
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your name"
                value={profileData.fullName}
                onChange={handleInputChange("fullName")}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f5f5f5",
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#468F9D" },
                    "&.Mui-focused fieldset": { borderColor: "#468F9D" },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body1" sx={{ mb: 1, color: "#333", fontWeight: 500 }}>
                Phone number
              </Typography>
              <TextField
                fullWidth
                placeholder={PHONE_PLACEHOLDERS[profileData.countryCode] || "Enter phone number"}
                value={profileData.phoneNumber}
                onChange={handleInputChange("phoneNumber")}
                error={Boolean(phoneError)}
                helperText={phoneError || " "}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={profileData.countryCode}
                        onChange={handleInputChange("countryCode")}
                        variant="standard"
                        disableUnderline
                        sx={{
                          "& .MuiSelect-select": {
                            paddingRight: "24px !important",
                            fontSize: "14px",
                          },
                        }}
                      >
                        <MenuItem sx={{ color: "black" }} value="+1">+1</MenuItem>
                        <MenuItem sx={{ color: "black" }} value="+44">+44</MenuItem>
                        <MenuItem sx={{ color: "black" }} value="+91">+91</MenuItem>
                        <MenuItem sx={{ color: "black" }} value="+86">+86</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f5f5f5",
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#468F9D" },
                    "&.Mui-focused fieldset": { borderColor: "#468F9D" },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" }, gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleUpdateProfile}
              disabled={isUpdating}
              sx={{
                backgroundColor: "#468F9D",
                "&:hover": { backgroundColor: "#4db6ac" },
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={isUpdating}
              sx={{
                borderColor: "#ccc",
                color: "#666",
                "&:hover": { borderColor: "#999", backgroundColor: "#f5f5f5" },
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

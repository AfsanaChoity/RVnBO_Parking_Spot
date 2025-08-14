import { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import AuthCloseButton from "../Shared/AuthCloseButton";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import InputName from "../common/InputName";
import InputEmail from "../common/InputEmail";
import InputPassword from "../common/InputPassword";
import TealButton from "../common/TealButton";

import { useSignupMutation } from "../../redux/api/authApi";
import { useAuth, useUserRole } from "../../redux/hooks";

export default function SignUp() {
  const [formData, setFormData] = useState({
    nameAndSurname: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState(""); // For backend or validation errors

  const { role } = useUserRole(); // Role selected on RoleSelectionPage
  const { setCredentials } = useAuth(); // Redux action to store user/token/role
  const navigate = useNavigate();

  const [signup] = useSignupMutation(); // RTK Query mutation

  // Handle form input changes
  const handleInputChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    setErrorMessage("");    // Clear previous errors

    // Validation: Terms & Conditions
    if (!formData.agreeToTerms) {
      setErrorMessage("You must agree to Terms & Conditions.");
      return;
    }

    try {
      // Call signup API
      const response = await signup({ ...formData, role }).unwrap();

      // Save user info + token + role in Redux
      setCredentials({ user: response.user, token: response.token, role: response.role });

      // Navigate to verification page
      navigate("/auth/verification");
    } catch (err) {
      // Show backend error messages in UI
      if (err?.data?.message) {
        setErrorMessage(err.data.message); // Example: "Email already exists"
      } else if (err?.error) {
        setErrorMessage(err.error);        // Fallback error
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <AuthPageWrapper text="Create Account">
      <AuthCloseButton />

      {/* Display backend or validation errors */}
      {errorMessage && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {errorMessage}
        </Typography>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {/* Name Input */}
        <InputName
          value={formData.nameAndSurname}
          onChange={handleInputChange("nameAndSurname")}
        />

        {/* Email Input */}
        <InputEmail
          value={formData.email}
          onChange={handleInputChange("email")}
          label="Email Address"
        />

        {/* Password Input */}
        <InputPassword
          value={formData.password}
          onChange={handleInputChange("password")}
          label="Password"
        />

        {/* Terms & Conditions */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={handleInputChange("agreeToTerms")}
                sx={{
                  color: "grey.400",
                  "&.Mui-checked": { color: "#468F9D" },
                }}
              />
            }
            label={
              <p>
                I agree to the{" "}
                <Link to="/terms-conditions" className="text-[#468F9D]">
                  Terms & Conditions
                </Link>
              </p>
            }
          />
        </Box>

        {/* Submit Button */}
        <div className="mb-4">
          <TealButton type="submit" text="Register" /> {/* type="submit" triggers handleSubmit */}
        </div>

        {/* Link to Login page */}
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            style={{ color: "#468F9D", textDecoration: "none", fontWeight: 500 }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </AuthPageWrapper>
  );
}

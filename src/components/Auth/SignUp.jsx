import { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import AuthCloseButton from "../Shared/AuthCloseButton";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import InputName from "../common/InputName";
import InputEmail from "../common/InputEmail";
import InputPassword from "../common/InputPassword";
import TealButton from "../common/TealButton";

import { useSignupMutation } from "../../redux/api/authApi";
import { useAuth, useUserRole } from "../../redux/hooks"; // Don't redeclare 'role'
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/slices/userRoleSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const { role } = useUserRole(); // Get role from Redux (Don't declare role again)
  
  // If the role is not set in Redux, get it from localStorage
  useEffect(() => {
    if (!role) {
      const savedRole = localStorage.getItem('userRole');
      if (savedRole) {
        dispatch(setRole(savedRole));  // Dispatch role from localStorage
      }
    }
  }, [dispatch, role]);  // Only dispatch if role is not set

  const [formData, setFormData] = useState({
    nameAndSurname: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const { setCredentials } = useAuth(); 
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const handleInputChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); 
    setLoading(false);

    if (!formData.nameAndSurname || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!formData.agreeToTerms) {
      setErrorMessage("You must agree to Terms & Conditions.");
      return;
    }

    // Start loading when API call begins
    setLoading(true);

    try {
      const response = await signup({
        name: formData.nameAndSurname,
        email: formData.email,
        password: formData.password,
        role
      }).unwrap();

      localStorage.setItem("userEmail", formData.email);
      
      // Store credentials
      setCredentials({ user: response.user || null, token: response.token || null, role });

      // Navigate to verification page
      navigate("/auth/verification");

    } catch (err) {
      console.error("Signup error:", err);

      // Stop loading if error occurs
      setLoading(false);

      if (err?.data?.message) {
        setErrorMessage(err.data.message);
      } else if (err?.error) {
        setErrorMessage(err.error);
      } else {
        setErrorMessage("Registration failed. Please try again!");
      }
    }
  };

  return (
    <AuthPageWrapper text="Create Account">
      <AuthCloseButton />

      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <InputName
          value={formData.nameAndSurname}
          onChange={handleInputChange("nameAndSurname")}
        />
        <InputEmail
          value={formData.email}
          onChange={handleInputChange("email")}
          label="Email Address"
        />
        <InputPassword
          value={formData.password}
          onChange={handleInputChange("password")}
          label="Password"
        />

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

        {/* Loading / Pending message */}
        {loading && (
          <Typography
            variant="body2"
            color="primary"
            sx={{ textAlign: "center", mb: 2, fontSize: 18 }}
          >
            Done! Waiting for verification code…
          </Typography>
        )}

        {/* Error message */}
        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center", mb: 2, fontSize: 18 }}
          >
            {errorMessage}
          </Typography>
        )}

        <div className="mb-4">
          <TealButton type="submit" text="Register" />
        </div>

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

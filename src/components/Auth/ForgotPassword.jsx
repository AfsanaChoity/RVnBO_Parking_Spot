import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux"; // For dispatching actions
import { useNavigate } from "react-router-dom"; // For navigation after successful submission
import { useForgotPasswordMutation } from "../../redux/api/authApi"; // ForgotPassword mutation from RTK Query
import { setEmail } from "../../redux/slices/passwordResetSlice"; // Action to store email in Redux

import CenterParagraph from "../common/CenterParagraph";
import InputEmail from "../common/InputEmail";
import AuthHeaderIcon from "../Shared/AuthHeaderIcon";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import TealButton from "../common/TealButton";
import BackToLogin from "../Shared/BackToLogin";

export default function ForgotPassword() {
  const [localEmail, setLocalEmail] = useState(""); // Renamed local state setter to avoid conflict
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // For loading state

  const dispatch = useDispatch(); // For dispatching actions
  const navigate = useNavigate(); // For navigation after successful submission

  const [forgotPassword] = useForgotPasswordMutation(); // RTK Query for forgotPassword API

  // Handle email input change
  const handleEmailChange = (event) => {
    setLocalEmail(event.target.value); // Update email in local state
  };

  // Handle form submission (send email for password reset)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    setLoading(true); // Set loading to true

    if (!localEmail) {
      setErrorMessage("Please enter your email.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    if(localEmail){
      localStorage.setItem("userEmail", localEmail);
    }

    try {
      // Dispatch email to Redux (store it globally)
      dispatch(setEmail(localEmail)); // Store email in Redux

      // Call the forgotPassword mutation
      const response = await forgotPassword(localEmail).unwrap(); // Call the API and unwrap the response

      // Handle success
      setLoading(false);
      navigate("/auth/otp"); // Navigate to OTP page for verification
    } catch (err) {
      // Handle error from the API
      setLoading(false);
      setErrorMessage(err?.data?.message || "Failed to send verification code. Please try again.");
    }
  };

  return (
    <AuthPageWrapper text="Forgot Password" icon={<AuthHeaderIcon />}>
      <div className="mb-16">
        <CenterParagraph text="Please enter your email to get a verification code" />
      </div>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {/* Email Input */}
        <InputEmail value={localEmail} onChange={handleEmailChange} label="Email Address" />

        {/* Error Message */}
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ textAlign: "center", mb: 2, fontSize: 18 }}>
            {errorMessage}
          </Typography>
        )}

        
        
        {/* Submit Button with static text */}
        <TealButton text="Continue" type="submit" /> 

        {/* Back to Login Link */}
        <BackToLogin />
      </Box>
    </AuthPageWrapper>
  );
}

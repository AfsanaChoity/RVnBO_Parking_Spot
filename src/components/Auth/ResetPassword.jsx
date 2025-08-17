import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CenterParagraph from "../common/CenterParagraph";
import InputPassword from "../common/InputPassword";
import AuthHeaderIcon from "../Shared/AuthHeaderIcon";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import TealButton from "../common/TealButton";
import BackToLogin from "../Shared/BackToLogin";

import { useResetPasswordMutation } from "../../redux/api/authApi";
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } from "../../redux/slices/passwordResetSlice"; // Redux actions

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { email } = useSelector((state) => state.passwordReset);
  // console.log(email);

  const [resetPassword] = useResetPasswordMutation();

  // Handle input change for passwords
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the passwords
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    dispatch(resetPasswordRequest());

    try {
      // Call the resetPassword mutation
      const response = await resetPassword({ newPassword, confirmPassword }).unwrap();

      // On success, update Redux state
      dispatch(resetPasswordSuccess());
      navigate("/auth/reset/success");

    } catch (err) {
      // On failure, dispatch error state
      dispatch(resetPasswordFailure(err?.data?.message || "Password reset failed. Please try again."));
      setErrorMessage(err?.data?.message || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageWrapper text="Set New Password" icon={<AuthHeaderIcon />}>
      <div className="mb-12">
        <CenterParagraph text="Your new password must be different from previously used passwords." />
      </div>



      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {/* New Password Input */}
        <InputPassword label="New Password" value={newPassword} onChange={handleNewPasswordChange} />

        {/* Confirm Password Input */}
        <InputPassword label="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />


        {/* Error Message */}
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ textAlign: "center", mb: 2, fontSize: 18 }}>
            {errorMessage}
          </Typography>
        )}

        {/* Submit Button */}
        <TealButton text="Reset Password" type="submit" />

        {/* Back to Login Link */}
        <BackToLogin />
      </Box>
    </AuthPageWrapper>
  );
}

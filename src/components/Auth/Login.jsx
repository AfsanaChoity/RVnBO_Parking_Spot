import { useState } from "react";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import AuthCloseButton from "../Shared/AuthCloseButton";
import { Box, Typography } from "@mui/material";
import InputEmail from "../common/InputEmail";
import InputPassword from "../common/InputPassword";
import TealButton from "../common/TealButton";
import { Link } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  ;
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  
  const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  setTimeout(() => {
    console.log("Login submitted:", formData);
    setLoading(false);
  }, 2000);
};


  


  return (
    <AuthPageWrapper text="Login">
      {/* Close Button */}
      <AuthCloseButton />

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {/* Email Input */}
        <InputEmail value={formData.email} onChange={handleInputChange("email")} label="Email Address" />

        {/* Password Input */}
        <InputPassword value={formData.password} onChange={handleInputChange("password")} label="Password" />

        {/* Forgot Password Link */}
        <div className="flex justify-end mb-10">
           <p className="text-[#468F9D]">
             <Link> Forgot Your Password?</Link>
           </p>
        </div>

        {/* Sign In Button */}

       <div className="mb-4">

         <TealButton text="Sign In" onClick={handleSubmit}></TealButton>

       </div>

        {/* Sign Up Link */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/auth/signup"

            style={{
              color: "#468F9D",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </AuthPageWrapper>
  )
}

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



  


  return (
    <AuthPageWrapper text="Login Here!">
      {/* Close Button */}
      <AuthCloseButton />

      {/* Form */}
      <Box component="form"  sx={{ width: "100%" }}>
        {/* Email Input */}
        <InputEmail value={formData.email} onChange={handleInputChange("email")} label="Email Address" />

        {/* Password Input */}
        <InputPassword value={formData.password} onChange={handleInputChange("password")} label="Password" />

        {/* Forgot Password Link */}
        <div className="flex justify-end mb-10">
           <p className="text-[#468F9D]">
             <Link to="/auth/forgot-password"> Forgot Your Password?</Link>
           </p>
        </div>

        {/* Sign In Button */}

       <div className="mb-4">

         <TealButton text="Sign In" onClick={() => localStorage.setItem("user", "user")}></TealButton>

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

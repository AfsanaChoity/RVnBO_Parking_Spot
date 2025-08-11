import { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom"; // <-- use react-router-dom

import AuthCloseButton from "../Shared/AuthCloseButton";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import InputName from "../common/InputName";
import InputEmail from "../common/InputEmail";
import InputPassword from "../common/InputPassword";
import TealButton from "../common/TealButton";


export default function SignUp() {
  const [formData, setFormData] = useState({
    nameAndSurname: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    // Simulate API call
    console.log("Form submitted:");
    console.table(formData);

    setLoading(false);
  }

  

  return (
    <AuthPageWrapper text="Create Account">
      
      <AuthCloseButton/>


      {/* Form */}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>

        {/* Name Input */}
        <InputName
          value={formData.nameAndSurname}
          onChange={handleInputChange("nameAndSurname")}
         
        />

        {/* Email Input */}
        <InputEmail value={formData.email} onChange={handleInputChange("email")} label="Email Address" />

        {/* Password Input */}
        <InputPassword value={formData.password} onChange={handleInputChange("password")} label="Password" />

        {/* Terms and Privacy Checkbox */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={handleInputChange("agreeToTerms")}
                sx={{
                  color: "grey.400",
                  "&.Mui-checked": {
                    color: "#468F9D",
                  },
                }}
              />
            }
            label={ <p>I agree to the <Link><span className="text-[#468F9D]">Term & Conditions</span></Link> </p>}
          />
        </Box>

        {/* Sign Up Button */}
        <div className="mb-4">
          <Link onSubmit={handleSubmit} to="/auth/verification" > <TealButton text="Register"/> </Link>
        </div>

        {/* Login Link */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/auth/login"
            style={{
              color: "#468F9D",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </AuthPageWrapper>
  )
}

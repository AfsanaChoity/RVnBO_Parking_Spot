import { Link } from "react-router"
import { useState } from "react"
import { Box } from "@mui/material"
import CenterParagraph from "../common/CenterParagraph"
import InputEmail from "../common/InputEmail"
import AuthCloseButton from "../Shared/AuthCloseButton"
import AuthHeaderIcon from "../Shared/AuthHeaderIcon"
import AuthPageWrapper from "../Shared/AuthPageWrapper"
import TealButton from "../common/TealButton"
import BackToLogin from "../Shared/BackToLogin"



export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Reset password email sent to:", email)
      setLoading(false)
      // You can add success message or redirect here
    }, 2000)
  }

  

  return (
    <AuthPageWrapper text="Forgot Password" icon={<AuthHeaderIcon />}>
    

      {/* Subtitle */}
      <div className="mb-16">
        <CenterParagraph text="Please enter your email to get verification code" />
      </div>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {/* Email Input */}
        <InputEmail value={email} onChange={handleEmailChange} label="Email Address" />

        {/* Reset Password Button */}
       <Link to="/auth/otp">
        <TealButton text="Continue"   />
       </Link>

        {/* Back to Login Link */}
        <BackToLogin/>
      </Box>
    </AuthPageWrapper>
  )
}

import { useState } from "react";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import AuthCloseButton from "../Shared/AuthCloseButton";
import { Box, Typography } from "@mui/material";
import InputEmail from "../common/InputEmail";
import InputPassword from "../common/InputPassword";
import TealButton from "../common/TealButton";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";
import { useAuth } from "../../redux/hooks";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setCredentials } = useAuth();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  // Handle input field changes
  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Handle form submission (login)
  const handleLogin = async () => {

    const data = {
      email: formData?.email,
      password: formData?.password
    }

    login(data).unwrap()
      .then((payload) => console.log('fulfilled', payload))
      .catch((error) => console.error('rejected', error));


    // if (!formData.email || !formData.password) {
    //   setErrorMessage("Enter your email and password first");
    //   return;
    // }



    // try {
    //   // Send login request to the backend
    //   const response = await login({
    //     email: formData.email,
    //     password: formData.password,
    //   }).unwrap(); 

    //   console.log(response)
    //   // If login is successful, store user and token in Redux
    //   if (response.user && response.token) {
    //   setCredentials({ user: response.user, token: response.token }); // Store user and token
    //   console.log(response)
    //   // navigate("/"); 

    // }
    // } catch (err) {
    //   console.error("Login error:", err);
    //   setErrorMessage(err?.data?.message || "Login failed. Please try again!");
    // } finally {
    //   setLoading(false); 
    // }
  };

  return (
    <AuthPageWrapper text="Login Here!">
      <AuthCloseButton />

      <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
        {/* Email Input */}
        <InputEmail value={formData.email} onChange={handleInputChange("email")} label="Email Address" />

        {/* Password Input */}
        <InputPassword value={formData.password} onChange={handleInputChange("password")} label="Password" />

        {/* Error Message */}
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ textAlign: "center", mb: 2, fontSize: 18 }}>
            {errorMessage}
          </Typography>
        )}



        {/* Forgot Password Link */}
        <div className="flex justify-end mb-10">
          <p className="text-[#468F9D]">
            <Link to="/auth/forgot-password">Forgot Your Password?</Link>
          </p>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <TealButton type="submit" text="Sign In" />
        </div>



        {/* Sign Up Link */}
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
          Don't have an account?{" "}
          <Link to="/auth/signup" style={{ color: "#468F9D", textDecoration: "none", fontWeight: 500 }}>
            Register
          </Link>
        </Typography>
      </Box>
    </AuthPageWrapper>
  );
}

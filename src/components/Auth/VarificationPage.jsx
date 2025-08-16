import { useState, useRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AuthPageWrapper from "../Shared/AuthPageWrapper";
import AuthHeaderIcon from "../Shared/AuthHeaderIcon";
import { Email } from "@mui/icons-material";
import TealButton from "../common/TealButton";

import { useVerifyEmailMutation, useResendCodeMutation } from "../../redux/api/authApi";
import { useAuth } from "../../redux/hooks";

export default function VerificationPage() {
    const navigate = useNavigate();
    const { setCredentials } = useAuth();

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [resendLoading, setResendLoading] = useState(false);

    const [verifyEmail] = useVerifyEmailMutation();
    const [resendCode] = useResendCodeMutation();

    // Create refs for each input
    const inputsRef = useRef([]);

    // Handle digit input
    const handleChange = (index) => (e) => {
        const val = e.target.value;
        if (/^\d?$/.test(val)) {
            const newCode = [...code];
            newCode[index] = val;
            setCode(newCode);

            // Move focus to next input if not last
            if (val !== "" && index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    // Handle backspace to move focus back
    const handleKeyDown = (index) => (e) => {
        if (e.key === "Backspace" && code[index] === "" && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    // Submit verification code
    const handleVerify = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (code.some((digit) => digit === "")) {
            setErrorMessage("Please enter all 6 digits");
            return;
        }

        try {
            const codeString = code.join("");
            const response = await verifyEmail({ code: codeString }).unwrap();

            setCredentials({
                user: response.user,
                token: response.token || null,
                role: response.user.role,
            });

            setSuccessMessage("Email verified successfully!");
            navigate("/auth/login");


        } catch (err) {
            console.error("Verification error:", err);
            setErrorMessage(err?.data?.message || "Verification failed. Please try again!");
        }
    };

    // Resend verification code
    const handleResendEmail = async () => {
        setResendLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const email = localStorage.getItem("userEmail"); // Retrieve the email from localStorage

        if (!email) {
            setErrorMessage("Email not found.");
            setResendLoading(false);
            return;
        }

        try {
            await resendCode(email).unwrap();
            setSuccessMessage("Verification code resent. Check your email!");
        } catch (err) {
            console.error("Resend code error:", err);
            setErrorMessage(err?.data?.message || "Failed to resend code. Please try again!");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <AuthPageWrapper text="Verify Your Email" icon={<AuthHeaderIcon icon={Email} />}>
            <div className="text-center mb-8">
                <p className="text-gray-500 text-xl">Enter the 6-digit code sent to your email</p>
            </div>


            {/* Code input boxes */}
            <div className="flex gap-2 mb-[32px] justify-center">
                {code.map((val, index) => (
                    <TextField
                        key={index}
                        value={val}
                        inputRef={(el) => inputsRef.current[index] = el} // Assign ref
                        onChange={handleChange(index)}
                        onKeyDown={handleKeyDown(index)}
                        inputProps={{
                            maxLength: 1,
                            style: { textAlign: "center", fontSize: 20, width: 24, height: 24 },
                        }}
                    />
                ))}
            </div>

            {/* Success / Error Messages */}
            {successMessage && (
                <Typography variant="body2" color="success.main" sx={{ textAlign: "center", mb: 2, fontSize: 18 }}>
                    {successMessage}
                </Typography>
            )}
            {errorMessage && (
                <Typography variant="body2" color="error" sx={{ textAlign: "center", mb: 2, fontSize: 18 }}>
                    {errorMessage}
                </Typography>
            )}


            {/* Verify Button */}
            <div className="mb-4">
                <TealButton text="Verify" onClick={handleVerify} />
            </div>

            {/* Resend code */}
            <div className="text-center text-xs">
                <p>
                    Didn't receive the code?{" "}
                    <span
                        onClick={handleResendEmail}
                        className={`text-[#468F9D] cursor-pointer ${resendLoading ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        {resendLoading ? "Resending..." : "Click to resend"}
                    </span>
                </p>
            </div>
        </AuthPageWrapper>
    );
}

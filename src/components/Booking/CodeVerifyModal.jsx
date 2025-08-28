
import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Box from "../../Component/Shared/Box";

const CodeVerifyModal = ({ open, onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSubmitting(true);

    // Simulate OTP verification API
    setTimeout(() => {
      setSubmitting(false);

      // If verification is successful:
      onClose?.();
      navigate("/payment");

      // If failed: message.error("Invalid OTP");
    }, 1500);
  };

  const handleResendEmail = () => {
    setResendLoading(true);
    setTimeout(() => setResendLoading(false), 1200);
  };

  const values = ["2", "8", "4", " ", " "];

  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}  // users can click outside to close
      closable
      title={<div style={{ textAlign: "center", fontWeight: 700, fontSize: 24 }}>Enter OTP</div>}
      footer={
        <Button
          type="primary"
          style={{ backgroundColor: "#468F9D", fontWeight: 600 }}
          loading={submitting}
          onClick={handleSubmit}
          block
        >
          Submit
        </Button>
      }
    >
      {/* OTP boxes */}
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

      {/* Resend */}
      <div className="text-center text-xs">
        <p>
          Didn&apos;t receive the OTP?{" "}
          <a onClick={handleResendEmail} style={{ color: "#468F9D" }}>
            {resendLoading ? "Resending..." : "Click to resend"}
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default CodeVerifyModal;

import React, { useState, useRef } from "react";
import { Modal, Button } from "antd";
import { TextField } from "@mui/material";
import { useVerifyBookingOtpMutation, usePaymentCheckoutMutation } from "../../redux/api/bookingApi"; 
import toast from "react-hot-toast";

const CodeVerifyModal = ({ open, onClose, bookingId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const [verifyBookingOtp] = useVerifyBookingOtpMutation();
  const [paymentCheckout] = usePaymentCheckoutMutation();

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setSubmitting(true);
    try {
      // 1️⃣ Verify OTP
      await verifyBookingOtp({ bookingId, code }).unwrap();
      toast.success("Booking verified successfully!");

      // 2️⃣ Call payment checkout
      const paymentRes = await paymentCheckout(bookingId).unwrap();

      // 3️⃣ Redirect to payment gateway if URL received
      if (paymentRes?.url) {
        window.location.href = paymentRes.url;
      } else {
        toast.error("No payment URL received!");
      }

      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "OTP verification or payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}
      closable
      title={
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 24 }}>
          Enter OTP
        </div>
      }
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
      <div className="flex gap-2 mb-[32px] justify-center">
        {otp.map((val, index) => (
          <TextField
            key={index}
            value={val}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputRef={(el) => (inputsRef.current[index] = el)}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: 14,
                width: 30,
                height: 30,
              },
            }}
          />
        ))}
      </div>

      <div className="text-center text-xs">
        <p>Check your email for the OTP.</p>
      </div>
    </Modal>
  );
};

export default CodeVerifyModal;

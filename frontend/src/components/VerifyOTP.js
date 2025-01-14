import axios from "axios";
import React, { useState } from "react";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendMessage, setSendMessage] = useState(""); // Message for sending OTP
  const [verifyMessage, setVerifyMessage] = useState(""); // Message for verifying OTP
  const [loading, setLoading] = useState(false); // To track loading state for buttons
  const [visited, setVisited] = useState(false); // To check if OTP has been sent

  //   Function to clear messaege

  const clearMessage = (setter) => {
    setTimeout(() => setter(""), 3000);
  };

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
      });
      setSendMessage(response.data.message);
      clearMessage(setSendMessage);
      setVisited(true); // OTP has been sent
    } catch (err) {
      setSendMessage(err.response?.data?.error || "An error occurred.");
      clearMessage(setSendMessage);
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });
      setVerifyMessage(response.data.message);
      clearMessage(setVerifyMessage);
    } catch (err) {
      setVerifyMessage(err.response?.data?.error || "An error occurred.");
        clearMessage(setVerifyMessage);
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  return (
    <div className="otp-container">
        
      <h2>Handle OTPs</h2>

      {/* Input for email */}
      <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Send OTP button */}
      {!visited && (
        <button onClick={handleSendOTP} disabled={loading}>
          Send OTP
        </button>
      )}
      <p
        className={
          sendMessage.includes("Successfully")
            ? "success-message"
            : "error-message"
        }
      >
        {sendMessage}
      </p>

      {/* OTP input field and Verify button, only shown after OTP is sent */}
      {visited && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP} disabled={loading}>
            Verify OTP
          </button>
        </>
      )}

      {/* Show message for verifying OTP */}
      <p
        className={
          verifyMessage.includes("Successfully")
            ? "success-message"
            : "error-message"
        }
      >
        {verifyMessage}
      </p>
    </div>
  );
};

export default VerifyOTP;

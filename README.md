# OTP Verification System

This project is an OTP (One-Time Password) verification system built using **Node.js** and **React**. The backend is powered by **Express.js**, and the OTPs are sent via **Gmail SMTP**. The frontend is a simple React app that allows users to enter their email, request an OTP, and verify it.

## Features

- **OTP Generation**: Generates a 6-digit OTP when a user requests it.
- **OTP Expiry**: The OTP expires after 5 minutes.
- **Email Delivery**: OTP is sent to the user's email via **Gmail SMTP**.
- **OTP Verification**: Users can enter the OTP they received to verify their identity.
- **Frontend (React)**: A simple interface for entering email, receiving OTP, and verifying OTP.

## Technologies Used

- **Backend**: 
  - Node.js
  - Express.js
  - Nodemailer (for email sending)
  - Body-parser (for parsing request bodies)
  - dotenv (for managing environment variables)
  - CORS (for enabling cross-origin requests)

- **Frontend**:
  - React.js
  - Axios (for making HTTP requests)

## Setup Instructions

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sarthak03dot/OTP-Authentication.git
   cd OTP-Authentication
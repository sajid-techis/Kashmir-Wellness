const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send email function
const sendEmail = async (to, subject, confirmationCode, name) => {
    const htmlContent = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          body {
            margin: 0;
            padding: 0;
            background-color: #f0f4f8;
            font-family: 'Poppins', sans-serif;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }
          .container:hover {
            transform: scale(1.01);
          }
          .header {
            background: linear-gradient(135deg, #0d6efd, #74b9ff);
            padding: 40px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            color: #fff;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px;
            text-align: center;
          }
          .content h2 {
            margin-top: 0;
            font-size: 24px;
            color: #333;
            font-weight: 500;
          }
          .content p {
            margin: 16px 0;
            line-height: 1.8;
            color: #555;
          }
          .code {
            display: inline-block;
            font-size: 36px;
            font-weight: 700;
            color: #0d6efd;
            background-color: #e9f3ff;
            padding: 14px 28px;
            border-radius: 12px;
            margin: 24px 0;
            letter-spacing: 5px;
          }
          .button {
            display: inline-block;
            background-color: #0d6efd;
            padding: 14px 28px;
            border-radius: 8px;
            font-size: 18px;
            margin-top: 20px;
            font-weight: 600;
            transition: background-color 0.3s, transform 0.2s;
            text-align: center;
          }
          .button a {
            color: #fff;
            text-decoration: none;
            font-weight: inherit;
            font-size: inherit;
            display: block;
          }
          .button:hover {
            background-color: #0b5ed7;
            transform: translateY(-2px);
          }
          .footer {
            background-color: #f1f1f1;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6c757d;
          }
          .footer a {
            color: #0d6efd;
            text-decoration: none;
            font-weight: 500;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Kashmir Wellness</h1>
          </div>
          <div class="content">
            <h2>Hello, ${name}!</h2>
            <p>We’re thrilled to have you onboard. Please use the code below to verify your account:</p>
            <div class="code">${confirmationCode}</div>
            <p>If you didn’t request this, feel free to ignore it or contact our support team for assistance.</p>
            <div class="button">
              <a href="https://kashmirwellness.com">Visit Our Website</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2024 Kashmir Wellness. All rights reserved.</p>
            <p>
              <a href="https://kashmirwellness.com">Privacy Policy</a> | 
              <a href="https://kashmirwellness.com/contact">Contact Us</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

    try {
        const mailOptions = {
            from: `"Kashmir Wellness" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

// Export the function
module.exports = { sendEmail };

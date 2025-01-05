const nodemailer = require('nodemailer');

// Define Forgot Password function to send HTML emails
const ForgotPassword = async (to, subject, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (for Gmail, use app-specific password)
      },
    });

    // Define the HTML template for the email
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #4CAF50;">Kashmir Wellness</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <a 
          href="${resetLink}" 
          style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;"
        >
          Reset Password
        </a>
        <p style="margin-top: 20px;">If you didn’t request this, you can safely ignore this email.</p>
        <p>Best regards,<br>Kashmir Wellness Team</p>
      </div>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"Kashmir Wellness" <${process.env.EMAIL_USER}>`, // Custom sender name
      to,
      subject,
      html: htmlTemplate, // Use the HTML template
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = { ForgotPassword };

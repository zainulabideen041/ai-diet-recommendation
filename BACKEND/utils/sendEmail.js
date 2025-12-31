const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, messageType, code, recipientName) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f6f9;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); overflow: hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #c70000 0%, #8b0000 100%); padding: 40px 30px; text-align: center;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td align="center">
                        <div style="width: 60px; height: 60px; background-color: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                          <span style="font-size: 28px; color: white;">${
                            messageType === "reset" ? "🔒" : "✉️"
                          }</span>
                        </div>
                        <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                          ${
                            messageType === "reset"
                              ? "Password Reset Request"
                              : "Email Verification"
                          }
                        </h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.9); font-weight: 400;">
                          AsiaBillions Gaming Platform
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="text-align: left;">
                    <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">
                      Hello ${recipientName},
                    </h2>
                    
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                      ${
                        messageType === "reset"
                          ? "We received a request to reset the password for your AsiaBillions account. To proceed with resetting your password, please use the verification code below:"
                          : "Welcome to AsiaBillions! We're excited to have you join our gaming community. To complete your account setup and ensure the security of your account, please verify your email address using the code below:"
                      }
                    </p>
                    
                    <!-- Verification Code Box -->
                    <div style="text-align: center; margin: 32px 0;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 2px solid #dee2e6; border-radius: 12px; padding: 24px 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #6c757d; text-transform: uppercase; letter-spacing: 1px;">
                          Verification Code
                        </p>
                        <div style="font-size: 32px; font-weight: 700; color: #c70000; font-family: 'Courier New', monospace; letter-spacing: 4px; margin: 0;">
                          ${code}
                        </div>
                      </div>
                    </div>
                    
                    <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 16px; margin: 24px 0;">
                      <p style="margin: 0; font-size: 14px; color: #856404; line-height: 1.5;">
                        <strong>⏰ Important:</strong> This verification code will expire in <strong>10 minutes</strong> for your security. Please use it promptly to complete the ${
                          messageType === "reset"
                            ? "password reset"
                            : "email verification"
                        } process.
                      </p>
                    </div>
                    
                    <p style="margin: 24px 0 0 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                      ${
                        messageType === "reset"
                          ? "If you didn't request a password reset, please ignore this email. Your account remains secure, and no changes will be made."
                          : "If you didn't create an account with AsiaBillions, you can safely ignore this email."
                      }
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Support Section -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; border-top: 1px solid #e9ecef;">
                  <div style="text-align: center;">
                    <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">
                      Need Help?
                    </h3>
                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #6c757d;">
                      Our support team is here to assist you 24/7. Contact us anytime if you have questions.
                    </p>
                    <a href="mailto:support@asiabillions.com" style="display: inline-block; background-color: #c70000; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                      Contact Support
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px; text-align: center; background-color: #ffffff;">
                  <div style="border-top: 1px solid #e9ecef; padding-top: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #c70000;">
                      AsiaBillions Gaming Platform
                    </p>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #6c757d; line-height: 1.5;">
                      The ultimate destination for premium games and entertainment
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #9ca3af; line-height: 1.4;">
                      This email was sent to ${to}. You're receiving this because you have an account with AsiaBillions.
                      <br>
                      © ${new Date().getFullYear()} AsiaBillions. All rights reserved.
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Plain text version (important for spam prevention)
  const textContent = `
AsiaBillions - ${
    messageType === "reset" ? "Password Reset" : "Email Verification"
  }

Hello ${recipientName},

${
  messageType === "reset"
    ? "You requested to reset your password for your AsiaBillions account. Use the verification code below to continue:"
    : "Welcome to AsiaBillions! Please verify your email address using the code below:"
}

Verification Code: ${code}

This code will expire in 10 minutes for your security.

${
  messageType === "reset"
    ? "If you didn't request a password reset, you can safely ignore this email."
    : "If you didn't create an account with AsiaBillions, you can safely ignore this email."
}

Need assistance? Contact our support team at support@asiabillions.com

Best regards,
The AsiaBillions Team

© ${new Date().getFullYear()} AsiaBillions. All rights reserved.
  `.trim();

  // Enhanced transporter configuration for better deliverability
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password, not regular password
    },
    pool: true, // Use connection pooling
    maxConnections: 1,
    rateDelta: 20000, // 20 seconds between emails
    rateLimit: 3, // Max 3 emails per rateDelta
  });

  // Email options with spam prevention techniques
  const mailOptions = {
    from: {
      name: "AsiaBillions",
      address: process.env.EMAIL_USER,
    },
    to: to,
    subject: subject,
    text: textContent, // Always include plain text version
    html: htmlContent,
    headers: {
      "X-Priority": "3", // Normal priority
      "X-MSMail-Priority": "Normal",
      "List-Unsubscribe": "<mailto:unsubscribe@asiabillions.com>",
      "X-Mailer": "AsiaBillions Notification System",
    },
    // Add message ID for better tracking
    messageId: `<${Date.now()}.${Math.random()
      .toString(36)
      .substr(2, 9)}@asiabillions.com>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;

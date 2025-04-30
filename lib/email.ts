import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'admin@pocergaming.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPurchaseConfirmationEmail = async (
  to: string,
  productName: string,
  itemName: string,
  price: number,
  playerId: string
) => {
  const mailOptions = {
    from: 'admin@pocergaming.com',
    to,
    subject: 'Purchase Confirmation - PocerGaming',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank You For Your Purchase!</h2>
        <p>Your purchase has been confirmed and is being processed.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937;">Order Details:</h3>
          <p><strong>Game:</strong> ${productName}</p>
          <p><strong>Item:</strong> ${itemName}</p>
          <p><strong>Price:</strong> Rp ${price.toLocaleString('id-ID')},-</p>
          <p><strong>Player ID:</strong> ${playerId}</p>
        </div>
        
        <p>We'll notify you once your purchase is completed. If you have any questions, please contact our support team.</p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
          Best regards,<br>
          PocerGaming Team
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}; 
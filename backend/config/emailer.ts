import nodemailer from 'nodemailer';
import { SendEmailDTO } from '../interfaces';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS — not SSL
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (emailDetails: SendEmailDTO): Promise<void> => {
  try {
    const fromName = process.env.EMAIL_FROM_NAME || 'FinTrack';
    await transporter.sendMail({
      from: `"${fromName}" <${process.env.GMAIL_USER}>`,
      to: emailDetails.to,
      subject: emailDetails.subject,
      html: emailDetails.html,
      text: emailDetails.text,
    });
    console.log(`Email sent to ${emailDetails.to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    // Swallow — failed email should not break the calling flow
  }
};
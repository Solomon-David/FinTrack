import nodemailer from 'nodemailer';
import { SendEmailDTO } from '../interfaces';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,       // your gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // the 16-char app password
  },
});

export const sendEmail = async (dto: SendEmailDTO): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"FinTrack" <${process.env.GMAIL_USER}>`,
      to: dto.to,
      subject: dto.subject,
      html: dto.html,
      text: dto.text,
    });
    console.log(`Email sent to ${dto.to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
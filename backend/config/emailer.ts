//importing nodemailer
import nodemailer from "nodemailer";
import { SendEmailDTO } from '../interfaces';

//creating transporter for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});



// function to send email
export const sendEmail = async <SendEmailDTO>(emailDetails: SendEmailDTO): Promise<void>=>{
    try {
        const email = transporter.sendMail({
            from: "FinTrack",
            ...emailDetails
        });
    } catch (error) {
        const err = error as Error;
        console.log(`Error sending email: ${err}`);
        throw new Error(`Error sending email: ${err}`);
    }

}
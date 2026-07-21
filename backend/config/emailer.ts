import { SendEmailDTO } from '../interfaces';

// Brevo sends over HTTPS (their REST API), not raw SMTP — this avoids
// Render's default outbound SMTP port block that caused the original
// nodemailer/Gmail setup to hang until ETIMEDOUT and crash the process.
// Brevo's free tier also allows sending to any recipient without needing
// a verified domain, unlike Resend's sandbox mode which restricts sending
// to only the account's own email address.
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export const sendEmail = async <SendEmailDTO>(emailDetails: SendEmailDTO): Promise<void> => {
    try {
        const { to, subject, html } = emailDetails as any;

        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY || '',
            },
            body: JSON.stringify({
                sender: {
                    name: process.env.EMAIL_FROM_NAME || 'FinTrack',
                    email: process.env.EMAIL_FROM_ADDRESS,
                },
                to: [{ email: to }],
                subject,
                htmlContent: html,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Brevo API error:', response.status, errorBody);
            // Swallow rather than throw — a failed email should not break
            // the calling flow (e.g. signup should still succeed even if
            // the verification email fails to send; the user can request
            // a resend). See call sites in user.controller.ts.
            return;
        }
    } catch (error) {
        console.error('Error sending email:', error);
        // Same reasoning — never let an email failure bubble up and crash
        // or fail the parent request.
    }
}
import { Resend } from 'resend';
import { SendEmailDTO } from '../interfaces';

// Resend sends over HTTPS, not raw SMTP — this avoids Render's default
// outbound SMTP port block, which was causing nodemailer's SMTP connection
// to hang until ETIMEDOUT and crash the process (unhandled at the top
// level, since the throw inside sendEmail alone wasn't enough to stop it
// propagating past whatever called it without its own try/catch).
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async <SendEmailDTO>(emailDetails: SendEmailDTO): Promise<void> => {
    try {
        const { to, subject, html } = emailDetails as any;
        const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'FinTrack <onboarding@resend.dev>',
            to,
            subject,
            html,
        });
        if (error) {
            console.error('Resend API error:', error);
            // Swallow rather than throw — a failed email should not break
            // the calling flow (e.g. signup should still succeed even if
            // the verification email fails to send; the user can request
            // a resend). See call sites in user.controller.ts.
        }
    } catch (error) {
        console.error('Error sending email:', error);
        // Same reasoning — never let an email failure bubble up and crash
        // or fail the parent request.
    }
}
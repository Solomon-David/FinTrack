import { google } from 'googleapis';
import { SendEmailDTO } from '../interfaces';

// Sends via the Gmail REST API (HTTPS) rather than SMTP or nodemailer's
// OAuth2 SMTP transport — the latter still opens a raw SMTP connection
// under the hood even with OAuth2 credentials, which Render blocks by
// default (this was the cause of the original ETIMEDOUT crash). The
// Gmail API sends the fully-formed message as a single HTTPS POST instead,
// so it's unaffected by that restriction.
const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Base64url-encodes a string per RFC 4648 §5, which is what the Gmail API
// requires for the `raw` message field (standard base64 with +/ replaced
// by -_ and no padding).
function toBase64Url(input: string): string {
    return Buffer.from(input)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Builds a minimal RFC 2822 MIME message. Only handles plain "to/subject/html"
// sends, matching what the rest of the app currently needs.
function buildRawMessage(to: string, subject: string, html: string): string {
    const fromName = process.env.EMAIL_FROM_NAME || 'FinTrack';
    const fromAddress = process.env.GMAIL_SENDER_ADDRESS;

    const message = [
        `From: ${fromName} <${fromAddress}>`,
        `To: ${to}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        '',
        html,
    ].join('\r\n');

    return toBase64Url(message);
}

export const sendEmail = async <SendEmailDTO>(emailDetails: SendEmailDTO): Promise<void> => {
    try {
        const { to, subject, html } = emailDetails as any;

        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: buildRawMessage(to, subject, html),
            },
        });
    } catch (error) {
        console.error('Error sending email via Gmail API:', error);
        // Swallow rather than throw — a failed email should not break the
        // calling flow (e.g. signup should still succeed even if the
        // verification email fails to send; the user can request a resend).
        // See call sites in user.controller.ts.
    }
}
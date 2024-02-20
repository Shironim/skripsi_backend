import { Resend } from 'resend';

const resend = new Resend('re_4DPNYMRW_HUnZb4C8Mqcfoq7pXjF9uVxZ');

export default async function sendMail(subject, toEmail, otpHtml) {
  await resend.emails.send({
    from: 'ADMS Foto Video <onboarding@resend.dev>',
    to: [toEmail],
    subject: subject,
    html: otpHtml,
    headers: {
      'X-Entity-Ref-ID': '4DPNYMRW_HUnZb4C8Mqcfoq7pXjF9uVxZ',
    },
  });
}
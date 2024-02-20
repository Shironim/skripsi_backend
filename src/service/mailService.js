import { Resend } from 'resend';

const resend = new Resend(`re_${process.env.RESEND_API_KEY}`);

export default async function sendMail(subject, toEmail, otpHtml) {
  await resend.emails.send({
    from: 'ADMS Foto Video <onboarding@resend.dev>',
    to: [toEmail],
    subject: subject,
    html: otpHtml,
    headers: {
      'X-Entity-Ref-ID': `${process.env.RESEND_API_KEY}`,
    },
  });
}
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Create a transporter from env config. Keeps logic in one place and makes
// error handling for auth/connection easier to reuse.
function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = typeof process.env.SMTP_SECURE !== 'undefined' ? process.env.SMTP_SECURE === 'true' : port === 465;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // allow optional override for self-signed certs: set SMTP_REJECT_UNAUTHORIZED=false
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
    }
  });
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, source, interest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Create transporter from env (reusable helper)
    const transporter = createTransporter();

    // Verify connection config early and give helpful error messages
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('SMTP verify failed', verifyErr);
      // Map common auth failures to friendlier responses
      if (verifyErr && verifyErr.code === 'EAUTH') {
        return res.status(502).json({
          error: 'SMTP authentication failed',
          details: 'Invalid SMTP username/password or authentication blocked by provider. Check SMTP_USER, SMTP_PASS and provider settings (app passwords, 2FA, OAuth).'
        });
      }
      return res.status(502).json({ error: 'SMTP connection failed', details: verifyErr.message });
    }

    const to = process.env.TO_EMAIL;
    if (!to) {
      return res.status(500).json({ error: 'No destination email configured' });
    }

    const mail = {
      from: process.env.SMTP_FROM || `"Solvevare Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: process.env.TO_EMAIL,
      envelope: {
        from: process.env.SMTP_USER,
        to,
      },
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nSource: ${source || '-'}\nInterest: ${interest || '-'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || '-'}</p>
            <p><strong>Source:</strong> ${source || '-'}</p>
            <p><strong>Interest:</strong> ${interest || '-'}</p>
            <hr />
            <p>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    try {
      const info = await transporter.sendMail(mail);
      console.log('Contact message sent', info.messageId || info);
      return res.json({ ok: true });
    } catch (sendErr) {
      console.error('Error sending contact email', sendErr);
      if (sendErr && sendErr.code === 'EENVELOPE') {
        return res.status(400).json({ error: 'Envelope rejected by SMTP server', details: sendErr.response || sendErr.message, hint: 'The SMTP provider refused the sender/recipient. Make sure SMTP_FROM or SMTP_USER is allowed to send to the destination.' });
      }
      if (sendErr && sendErr.code === 'EAUTH') {
        return res.status(502).json({ error: 'SMTP authentication failed', details: sendErr.response || sendErr.message });
      }
      return res.status(500).json({ error: 'Failed to send email', details: sendErr.message });
    }
  } catch (err) {
    console.error('Error sending contact email', err);
    const message = err?.message || 'Failed to send email';
    return res.status(500).json({ error: 'Failed to send email', details: process.env.NODE_ENV === 'production' ? undefined : message });
  }
});

app.post('/api/send-test', async (_req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    const to = process.env.TO_EMAIL;
    if (!to) return res.status(500).json({ error: 'No TO_EMAIL configured' });
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'SMTP Test Message',
      text: 'This is a test message from the contact server to verify SMTP settings.',
      envelope: { from: process.env.SMTP_USER, to }
    });
    return res.json({ ok: true, info: info.messageId || info });
  } catch (err) {
    console.error('SMTP test send failed', err);
    if (err && err.code === 'EAUTH') {
      return res.status(502).json({ error: 'SMTP authentication failed', details: 'Check SMTP credentials and provider (app passwords, OAuth, 2FA).' });
    }
    return res.status(500).json({ error: 'SMTP test failed', details: err?.message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Contact server running on port ${PORT}`);
});

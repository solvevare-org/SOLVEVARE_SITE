import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'server', '.env') });

async function testSMTP() {
  console.log('Testing SMTP Configuration...\n');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP Port:', process.env.SMTP_PORT);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('TO_EMAIL:', process.env.TO_EMAIL);
  console.log('---\n');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
    }
  });

  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection successful!\n');

    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: 'SMTP Test - Solvevare Contact Form',
      text: 'This is a test message to verify SMTP is working correctly.',
      html: '<p>This is a test message to verify SMTP is working correctly.</p>'
    });

    console.log('✓ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('✗ SMTP Error:', error.message);
    if (error.code === 'EAUTH') {
      console.error('\nAuth Error - Check your SMTP credentials:');
      console.error('- SMTP_USER:', process.env.SMTP_USER);
      console.error('- SMTP_PASS: (hidden)');
    }
  }
}

testSMTP();

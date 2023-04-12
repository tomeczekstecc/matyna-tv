import nodemailer from 'nodemailer';

const email = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASSWORD + '$'
const host = process.env.EMAIL_HOST
const port = process.env.EMAIL_PORT
const secure = process.env.EMAIL_SECURE


export const transporter = nodemailer.createTransport({
  // @ts-ignore
  host,
  port,
  secure,
  auth: {
    user: email,
    pass
  }
});


export const mailOptions = {
  from: `Admin <${email}>`,
  to: 'tomeczekstecc@gmail.com',
}

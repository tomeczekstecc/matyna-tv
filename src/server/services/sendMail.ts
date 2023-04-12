import {mailOptions, transporter} from "@/server/config/nodemailer";
import {TRPCError} from "@trpc/server";
import {makeVerificationUrl} from "@/server/helpers/validVerificationUrl";

export const sendMail = async (email: string, token: string, type = 'reset') => {
  const href = makeVerificationUrl(token, type)
  const text = type === 'reset' ? 'Resetuj hasło' : 'Potwierdź swój adres email'

  try {
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: 'Potwierdź swój adres email',
      text,
      html: `<h3>Click <a href=${href}>${text}</a></h3>`
    })
    return {status: 'ok', message: 'Email sent'}
  } catch (e) {
    console.log(e)
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Something went wrong',
    })
  }
}

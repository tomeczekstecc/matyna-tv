import {createHash, createHmac, timingSafeEqual} from 'crypto';

export const signVerificationUrl = (url: string) => {
  return createHmac('sha256', process.env.APP_SECRET as string).update(url).digest('hex')
}

export const makeVerificationUrl = (token: string, action = 'reset') => {

  const url = `${process.env.BASE_URL}/auth/${action}?token=${token}`
  const signature = signVerificationUrl(token)
  return `${url}&signature=${signature}`
}


export const hasValidVerificationUrl = (token, querySignature) => {
  const signature: any = signVerificationUrl(token)
  return (
    timingSafeEqual(Buffer.from(signature), Buffer.from(querySignature))
  )
}

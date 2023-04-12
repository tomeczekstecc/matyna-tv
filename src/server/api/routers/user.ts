import {createTRPCRouter} from "@/server/api/trpc";
import {publicProcedure} from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {z} from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {hasValidVerificationUrl, makeVerificationUrl} from "@/server/helpers/validVerificationUrl";
import {makeJWTToken} from "@/server/helpers/makeToken";
import {sendMail} from "@/server/services/sendMail";
import {decode} from 'next-auth/jwt';


export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        surname: z.string(),
        confirmPassword: z.string(),
      }
    ))
    .mutation(async ({input, ctx}) => {
        // @ts-ignore
        if (input.password !== input.confirmPassword) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Passwords do not match',
          })
        }

        const existUser = await ctx.prisma.user.findUnique({
          where: {
            email: input.email,
          }
        })

        if (existUser) {
          throw new TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            }
          )
        }

        const salt = await bcrypt.genSalt(10)
        input.password = await bcrypt.hash(input.password, salt)


        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            name: input.name,
            surname: input.surname,
            password: input.password,
          },
        })


        const verificationToken = await makeJWTToken(user, 'verify')

        const token = await ctx.prisma.user.update({
          where: {
            email: input.email,
          },
          data: {
            verificationToken: verificationToken
          }
        })
        if (!token) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Token not found',
          })
        }
        await sendMail(input.email, verificationToken, 'verify')

      }
    ),
  verifyEmail: publicProcedure.input(z.object({
    token: z.string(),
    signature: z.string(),
  }))
    .mutation(async ({input, ctx}) => {

        const {id, email} = await jwt.verify(input.token, process.env.JWT_SECRET_VERIFY) as { id: string, email: string }

        const user = await ctx.prisma.user.findUnique({
          where: {
            email
          }
        })
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        if (user.verified) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already verified',
          })
        }


        if (!hasValidVerificationUrl(input.token, input.signature) || !email || !id || !user.verificationToken) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid token',
          })
        }

        if (id === user.id && email === user.email) {
          const token = await ctx.prisma.user.update({
            where: {
              email,
            },
            data: {
              verified: true,
              verifiedAt: new Date(),
              verificationToken: null
            }
          })
          if (!token) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Token not found',
            })
          }
          return {stauss: 'ok', message: 'Email verified'}
        }
      }
    )
  , requestResetPassword: publicProcedure.input(z.object({
    email: z.string(),
  }))
    .mutation(async ({input, ctx}) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: input.email,
          }
        })
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        const resetToken = await makeJWTToken(user, 'reset')

        const token = await ctx.prisma.user.update({
          where: {
            email: input.email,
          },
          data: {
            resetToken: resetToken
          }
        })
        if (!token) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Token not found',
          })
        }

        await sendMail(input.email, resetToken)

      }
    ),
  resetPassword: publicProcedure.input(z.object({
      email: z.string(),
      password: z.string(),
      token: z.string(),
      signature: z.string(),
    }
  ))
    .mutation(async ({input, ctx}) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: input.email,
          }
        })
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }
        const {id, email} = jwt.verify(input.token, process.env.JWT_SECRET_RESET)

        if (!hasValidVerificationUrl(input.token, input.signature) || !email || !id) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid token',
          })
        }

        if (id === user.id && email === user.email) {
          const salt = await bcrypt.genSalt(10)
          const newPass = await bcrypt.hash(input.password, salt)
          const token = await ctx.prisma.user.update({
            where: {
              email: input.email,
            },
            data: {
              password: newPass,
              resetToken: null
            }
          })
          if (!token) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Token not found',
            })
          }
          return true
        }
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid token',
          }
        )
      }
    ),
  changePassword: publicProcedure.input(z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    }
  ))
    .mutation(async ({input, ctx}) => {
// @różne sposoby wysiągania session
        // console.log(ctx.req.cookies?.['next-auth.session-token'], 'ccoocie')
        // console.log(ctx.user, 'ctx.user')
        // console.log(await decode({
        //   token: ctx.req.cookies?.['next-auth.session-token'], secret: process.env.NEXTAUTH_SECRET as string
        // }), 'decode')

        if (!ctx.user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authorized',
          })
        }

        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          }
        })

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        const isMatch = await bcrypt.compare(input.oldPassword, user.password)
        if (!isMatch) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid password',
          })
        }

        if (input.newPassword !== input.confirmPassword) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Passwords do not match',
          })
        }

        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(input.newPassword, salt)
        const token = await ctx.prisma.user.update({
          where: {
            email: ctx.user.email,
          },
          data: {
            password: newPass,
          }
        })
        if (!token) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Token not found',
          })
        }
        return true

      }
    ),
})



import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import {TRPCError} from "@trpc/server";

const prisma = new PrismaClient();


export default NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        //@ts-ignore
        const {email, password} = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          }
        })
        if (!user) {
          throw new Error('No user found')
        }

        console.log(user, '')
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid || !user.verified) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid credentials or user not verified',
            cause: 'Invalid credentials or user not verified'
          })
        }
        if (user) {

          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            role: user.role,
            
          }
        } else {
          console.log('no user')
        }
      },

    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

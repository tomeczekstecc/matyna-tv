import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@prisma/client";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import {TRPCError} from "@trpc/server";


const prisma = new PrismaClient();


// @ts-ignore
// @ts-ignore
export const authOptions: NextAuthOptions =
  {
    // adapter: PrismaAdapter(prisma),
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
    callbacks: {
      async session({token, session}) {
        if (token) {
          if (session.user!) {
            session.user.email = token.email
            session.user.role = token.role
            session.user.name = token.name
            session.user.surname = token.surname
            session.user.id = token.id

          }
        }
        return session
      },

      async jwt({token, user}) {

        console.log(token, 'token')
        console.log(user, 'user')
        if (user?.email) {
          const dbUser = await prisma.user.findUnique({
            where: {
              email: user.email,
            }
          })
          if (dbUser) {
            token.id = dbUser.id
            token.email = dbUser.email
            token.name = dbUser.name
            token.surname = dbUser.surname
            token.role = dbUser.role
          }

        }
        return token
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }


export default NextAuth(authOptions)

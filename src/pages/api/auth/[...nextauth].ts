import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

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

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
          throw new Error('Invalid password')
        }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          console.log('no user')
        }
      },

    })
  ],
  logger: {
    error: (message) => {
      console.log(message)

    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

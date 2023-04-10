import {createTRPCRouter} from "@/server/api/trpc";
import {publicProcedure} from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {z} from "zod";
import bcrypt from "bcryptjs";


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
        return user
      }
    ),

})

import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const blogRouter = createTRPCRouter({
  addBlogPost: publicProcedure
    .input(z.object({ title: z.string(), content: z.string(), subtitle: z.string(), categoryId: z.string() , imgURL: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.blogPost.create({
        data: {
          title: input.title,
          subtitle: input.subtitle,
          // @ts-ignore
          categoryId: input.categoryId,
          imgURL: input.imgURL,
          content: input.content,
        },
      })

      return true
    }),
  getAllPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blogPost.findMany()
  }),
})

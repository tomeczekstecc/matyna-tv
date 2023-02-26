import {z} from "zod"

import {createTRPCRouter, publicProcedure} from "../trpc"

export const blogRouter = createTRPCRouter({
  addBlogPost: publicProcedure
    .input(z.object({
      title: z.string(),
      content: z.string(),
      subtitle: z.string(),
      categoryId: z.string(),
      imgURL: z.string(),
      slug: z.string()
    }))
    .mutation(async ({input, ctx}) => {
      await ctx.prisma.blogPost.create({
        data: {
          title: input.title,
          subtitle: input.subtitle,
          // @ts-ignore
          categoryId: input.categoryId,
          imgURL: input.imgURL,
          content: input.content,
          slug: input.slug,
        },
      })

      return true
    }),
  getAllPosts: publicProcedure.query(({ctx}) => {
    //get all post with category

    return ctx.prisma.blogPost.findMany({
      include: {
        category: {
          select: {
            name: true,
            color: true,
          }
        }
      }
    })
  }),
  deletePost: publicProcedure.input(z.object({id: z.string()})).mutation(async ({input, ctx}) => {
    await ctx.prisma.blogPost.delete({
      where: {
        id: input.id
      }
    })
    return true
  }
  ),
})

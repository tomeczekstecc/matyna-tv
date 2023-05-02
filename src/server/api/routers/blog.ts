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
      const post = await ctx.prisma.blogPost.create({
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

      return post
    }),
  getAllPosts: publicProcedure.query(({ctx}) => {
    //get all post with category

    return ctx.prisma.blogPost.findMany({
      // @ts-ignore
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: {
          select: {
            name: true,
            color: true,
          }
        }
      },

    })
  }),
  getOnePost: publicProcedure.input(z.object({slug: z.string()})).query(async ({input, ctx}) => {
    return ctx.prisma.blogPost.findUnique({
      where: {
        slug: input.slug
      },
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
  updateOnePost: publicProcedure.input(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    subtitle: z.string(),
    categoryId: z.string(),
    imgURL: z.string(),
    slug: z.string()
  })).mutation(async ({input, ctx}) => {
    await ctx.prisma.blogPost.update({
      where: {
        id: input.id
      },
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

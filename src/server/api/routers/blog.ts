import {z} from "zod"
import {adminProcedure, createTRPCRouter, publicProcedure} from "../trpc"
import {BlogPost} from "@prisma/client";

export const blogRouter = createTRPCRouter({
  addBlogPost: adminProcedure
    .input(z.object({
      title: z.string().min(3, 'Tytuł musi zawierać conajmniej 3 znaki ').max(100, 'Tytuł jest za długi: max 100 znaków'),
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
          categoryId: input.categoryId,
          imgURL: input.imgURL,
          content: input.content,
          slug: input.slug,
        } as BlogPost,
      })

      return {...post}
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
  updateOnePost: adminProcedure.input(z.object({
    id: z.string(),
    title: z.string().min(3, 'Title is too short').max(100, 'Title is too long'),
    content: z.string().min(3, 'Content is too short').max(100000, 'Content is too long'),
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
  deletePost: adminProcedure.input(z.object({id: z.string()})).mutation(async ({input, ctx}) => {
      await ctx.prisma.blogPost.delete({
        where: {
          id: input.id
        }
      })
      return true
    }
  ),

})



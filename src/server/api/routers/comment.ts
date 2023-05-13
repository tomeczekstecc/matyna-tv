import {z} from "zod"
import { createTRPCRouter, publicProcedure, authProcedure} from "../trpc"
import {Comment} from "@prisma/client";
import {TRPCError} from "@trpc/server";
import {comment} from "postcss";

const blogComment = z.object({
  id: z.string().optional(),
  content: z.string({required_error: 'Treść jest wymagana'}).min(3, 'Treść musi zawierać conajmniej 3 znaki').max(100000, 'Treść jest za długa: max 100000 znaków'),
  blogPostId: z.string({required_error: 'Pole id bloga jest wymagane'}),
})


export const commentRouter = createTRPCRouter({
  addBlogComment: authProcedure
    .input(blogComment)
    .mutation(async ({input, ctx}) => {

      const hasAlreadyCommented = await ctx.prisma.comment.findFirst({
          where: {
            userId: ctx.user?.id,
            blogPostId: input.blogPostId
          }
        }
      )

      if (hasAlreadyCommented) {
        throw new TRPCError({code: 'BAD_REQUEST', message: 'Możesz dodać tylko jeden komentarz do tego posta'})
      }

      const comment: Comment = await ctx.prisma.comment.create({
        data: {
          content: input.content,
          userId: ctx.user?.id,
          blogPostId: input.blogPostId,
        } as Comment,
      })
      return {...comment}
    }),


  getBlogCommentsByPostId: publicProcedure.input(z.object({id: z.string()})).query(async ({input, ctx}) => {
    return ctx.prisma.comment.findMany({
      where: {
        blogPostId: input.id
      },
      include: {
        User: {
          select: {
            name: true,
            email: true,
            image: true,
            id: true,

          }
        }
      }
    })
  }
  ),

  getOneBlogComment: authProcedure.input(z.object({id: z.string()})).query(async ({input, ctx}) => {
    return ctx.prisma.comment.findUnique({
      where: {
        id: input.id
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        BlogPost: {
          select: {
            id: true,
          }
        }
      }
    })
  }),

  updateOneBlogPostComment: authProcedure.input(blogComment).mutation(async ({input, ctx}) => {
    const comment = await ctx.prisma.comment.update({
      where: {
        id: input.id
      },
      data: {
        content: input.content,
      },
    })
    return {...comment}
  }),
  deleteBlogPostComment: authProcedure.input(z.object({id: z.string()})).mutation(async ({input, ctx}) => {
      await ctx.prisma.comment.delete({
        where: {
          id: input.id
        }
      })
      return true
    }
  ),

})



import {z} from "zod"
import {adminProcedure, createTRPCRouter, publicProcedure} from "../trpc"
import {BlogPost} from "@prisma/client";

const blogInput = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Tytuł musi zawierać conajmniej 3 znaki ').max(100, 'Tytuł jest za długi: max 100 znaków'),
  subtitle: z.string().min(3, 'Podtytuł musi zawierać conajmniej 3 znaki ').max(100, 'Podtytuł jest za długi: max 300 znaków'),
  content: z.string().min(3, 'Treść musi zawierać conajmniej 100 znaków (html) ').max(100000, 'Treść jest za długa: max 100000 znaków'),
  categoryId: z.string({required_error: 'Wybierz kategorię'}),
  imgURL: z.string({required_error: 'Dodaj zdjęcie'}).url({message: 'Nie dodano zdjęcia lub niepoprawny adres URL zdjęcia'} as any),
  slug: z.string({required_error: 'Dodaj slug'})
})


export const blogRouter = createTRPCRouter({
  addBlogPost: adminProcedure
    .input(blogInput)
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

  updateOnePost: adminProcedure.input(blogInput).mutation(async ({input, ctx}) => {
    const post = await ctx.prisma.blogPost.update({
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
    return {...post}
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



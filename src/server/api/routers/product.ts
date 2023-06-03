import {z} from "zod"
import {adminProcedure, createTRPCRouter, publicProcedure} from "../trpc"
import {BlogPost, Product} from "@prisma/client";
import slugify from "slugify";

const productInput = z.object({
  id: z.string().optional(),
  name: z.string({required_error: 'Pole jest wymagane'}).min(3, 'Nazwa musi zawierać conajmniej 3 znaki ').max(100, 'Tytuł jest za długi: max 100 znaków'),
  description: z.string({required_error: 'Pole jest wymagane'}).min(3, 'Podtytuł musi zawierać conajmniej 3 znaki ').max(300, 'Podtytuł jest za długi: max 300 znaków'),
  shortDescription: z.string({required_error: 'Pole jest wymagane'}).min(3, 'Treść musi zawierać conajmniej 100 znaków (html) ').max(100000, 'Treść jest za długa: max 100000 znaków'),
  categoryId: z.string({required_error: 'Pole jest wymagane'}),
  imgURL: z.string({required_error: 'Pole jest wymagane'}).url({message: 'Nie dodano zdjęcia lub niepoprawny adres URL zdjęcia'} as any),
})


export const productRouter = createTRPCRouter({
  addProduct: adminProcedure
    .input(productInput)
    .mutation(async ({input, ctx}) => {

      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          categoryId: input.categoryId,
          imgURL: input.imgURL,
          slug: slugify(input.name),
        }  as Product,
      })

      return {...product}
    }),
  getAllProducts: publicProcedure.query(({ctx}) => {
    const product =  ctx.prisma.product.findMany({
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
    return {...product}
  }),
  //
  // getOnePost: publicProcedure.input(z.object({slug: z.string()})).query(async ({input, ctx}) => {
  //   return ctx.prisma.blogPost.findUnique({
  //     where: {
  //       slug: input.slug
  //     },
  //     include: {
  //       category: {
  //         select: {
  //           name: true,
  //           color: true,
  //         }
  //       }
  //     }
  //   })
  // }),
  //
  // updateOnePost: adminProcedure.input(blogInput).mutation(async ({input, ctx}) => {
  //   const post = await ctx.prisma.blogPost.update({
  //     where: {
  //       id: input.id
  //     },
  //     data: {
  //       title: input.title,
  //       subtitle: input.subtitle,
  //       // @ts-ignore
  //       categoryId: input.categoryId,
  //       imgURL: input.imgURL,
  //       content: input.content,
  //       slug: input.slug,
  //     },
  //   })
  //   return {...post}
  // }),
  // deletePost: adminProcedure.input(z.object({id: z.string()})).mutation(async ({input, ctx}) => {
  //     await ctx.prisma.blogPost.delete({
  //       where: {
  //         id: input.id
  //       }
  //     })
  //     return true
  //   }
  // ),

})



import {z} from "zod"

import {createTRPCRouter, publicProcedure} from "../trpc"
import {mapImages, search} from "@/lib/cloudinary";

export const mediaRouter = createTRPCRouter({
  // addBlogPost: publicProcedure
  //   .input(z.object({
  //     title: z.string(),
  //     content: z.string(),
  //     subtitle: z.string(),
  //     categoryId: z.string(),
  //     imgURL: z.string(),
  //     slug: z.string()
  //   }))
  //   .mutation(async ({input, ctx}) => {
  //     await ctx.prisma.blogPost.create({
  //       data: {
  //         title: input.title,
  //         subtitle: input.subtitle,
  //         // @ts-ignore
  //         categoryId: input.categoryId,
  //         imgURL: input.imgURL,
  //         content: input.content,
  //         slug: input.slug,
  //       },
  //     })
  //
  //     return true
  //   }),
  // getAllPosts: publicProcedure.query(({ctx}) => {
  //   //   //get all post with category
  //   //
  //   //   return ctx.prisma.blogPost.findMany({
  //   //     include: {
  //   //       category: {
  //   //         select: {
  //   //           name: true,
  //   //           color: true,
  //   //         }
  //   //       }
  //   //     }
  //   //   })
  //   // }),
  getAllImages: publicProcedure.input(z.object({
    nextCursor: z.string().optional()
  })).query(async ({ctx}) => {
    const res = await search({
      max_results: 12,
      // expression: 'folder:""' // root folder
      expression: 'folder:martyna-tv'
    })
    const {resources, next_cursor: nextCursor} = res
    const images = mapImages(resources)
    return {images, nextCursor}

  }),
})

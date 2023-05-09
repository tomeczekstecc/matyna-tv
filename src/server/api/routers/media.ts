import {z} from "zod"

import {adminProcedure, createTRPCRouter, publicProcedure} from "../trpc"
import {mapImages, search} from "@/lib/cloudinary";

export const mediaRouter = createTRPCRouter({

  getAllImages: adminProcedure.input(z.object({
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

import {z} from "zod"
import {adminProcedure, createTRPCRouter, publicProcedure} from "../trpc"
import {BlogPost, Order} from "@prisma/client";
import _ from "lodash";
import {prisma} from "@/server/db";

const orderInput = z.object({
  // id: z.string().optional(),
  id: z.number().optional(),
  status: z.string().optional(),
  email: z.string().optional(),
  items: z.array(z.object({
      id: z.string(),
      quantity: z.number(),
    }
  ))
})

export const orderRouter = createTRPCRouter({
  addOrder: publicProcedure
    .input(orderInput)
    .mutation(async ({input, ctx}) => {

      const totalQuantity = input.items?.reduce((acc, item) => {
          return acc + item.quantity
        }
        , 0)

      const itemsWithPrice = await ctx.prisma.product.findMany({
        where: {
          id: {
            in: input.items?.map(item => item.id)
          }
        },
        select: {
          id: true,
          price: true,
        }
      })

      const itemsWithPriceAndQuantity = itemsWithPrice.map(item => {
        const quantity = input.items?.find(i => i.id === item.id)?.quantity
        return {
          ...item,
          quantity
        }
      })


      const totalToPay = itemsWithPriceAndQuantity?.reduce((acc, item) => {
          return _.round((acc + (item.quantity || 0) * item.price), 2)
        }
        , 0)

      //@ create order
      const order = await ctx.prisma.order.create({
          data: {
            userId: ctx.user?.id || null,
            email: ctx.user?.email || input.email,
            total: totalToPay,
          }
        }
      ) as unknown as Order

//@ crate order pivots
      const pivots = await ctx.prisma.productOrderPivot.createMany({
        // @ts-ignore
        data: itemsWithPriceAndQuantity?.map(item => {
            return {
              quantity: item.quantity,
              productId: item.id,
              orderId: order.id,
            }
          }
        )
      })


      // const [order, pivots] = await  prisma.$transaction([ctx.prisma.order.create({
      //        data: {
      //          userId: ctx.user?.id || null,
      //          email: ctx.user?.email || input.email,
      //          total: totalToPay,
      //        }
      //      }
      //    ), ctx.prisma.productOrderPivot.createMany({
      //      // @ts-ignore
      //      data: itemsWithPriceAndQuantity?.map(item => {
      //          return {
      //            quantity: item.quantity,
      //            productId: item.id,
      //            orderId: order.id,
      //          }
      //        }
      //      )
      //    })])
      return {
        orderId: order.id,
        success: true,
        message: 'Gratulacje! Utworzono zamówienie'
      }
    }),
  // getAllOrdersByUserId: publicProcedure.query(({ctx}) => {
  //   return ctx.prisma.blogPost.findMany({
  //     // @ts-ignore
  //     orderBy: {
  //       createdAt: 'desc'
  //     },
  //     include: {
  //       category: {
  //         select: {
  //           name: true,
  //           color: true,
  //         }
  //       }
  //     },
  //
  //   })
  // }),

  // getOneOrder: publicProcedure.input(z.object({slug: z.string()})).query(async ({input, ctx}) => {
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

  // updateOneOrder: adminProcedure.input(blogInput).mutation(async ({input, ctx}) => {
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


})



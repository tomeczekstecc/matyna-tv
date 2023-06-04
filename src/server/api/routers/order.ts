import {z} from "zod"
import { createTRPCRouter, publicProcedure} from "../trpc"
import {Order} from "@prisma/client";
import _ from "lodash";

const orderInput = z.object({
  // id: z.string().optional(),
  id: z.string().optional(),
  status: z.string().optional(),
  paymentIntentId: z.string().optional(),
  email: z.string().optional(),
  items: z.array(z.object({
      id: z.string(),
      quantity: z.number(),
    }
  )).optional(),
})

export const orderRouter = createTRPCRouter({
  addOrder: publicProcedure
    .input(orderInput)
    .mutation(async ({input, ctx}) => {
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
    await ctx.prisma.productOrderPivot.createMany({
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
        message: 'Gratulacje! Utworzono zamówienie',
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

  getOneOrderWithItemsById: publicProcedure.input(z.object({id: z.string()})).query(async ({input, ctx}) => {
    const order = await ctx.prisma.order.findUnique({
      where: {
        id: input.id
      },
    })

    const items = await ctx.prisma.productOrderPivot.findMany({
      where: {
        orderId: order?.id
      },
    })

    const itemsWithProduct = await ctx.prisma.product.findMany({
        where: {
          id: {
            in: items?.map(item => item.productId)
          }
        },
        select: {
          id: true,
          name: true,
          price: true,
          imgURL: true,
        }
      }
    )

    const itemsWithProductAndQuantity = itemsWithProduct.map(item => {
      const quantity = items?.find(i => i.productId === item.id)?.quantity
      return {
        ...item,
        quantity
      }
    }
    )

    return {
      ...order,
      quantity: items?.reduce((acc, item) => {  return acc + item.quantity}, 0),
      items: itemsWithProductAndQuantity
    }

  }),

  updateOneOrderOnPayment: publicProcedure.input(orderInput).mutation(async ({input, ctx}) => {
    const order = await ctx.prisma.order.update({
      where: {
        id: input.id
      },
      data: {
        status: input.status as any,
        paymentIntentId: input.paymentIntentId,
      },
    })
    return {...order}
  }),
})



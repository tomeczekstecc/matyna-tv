import {z} from "zod"
import {createTRPCRouter, publicProcedure} from "../trpc"
import {Order} from "@prisma/client";
import _ from "lodash";
import {TRPCError} from "@trpc/server";

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

      if (!itemsWithPrice.length) throw new TRPCError({code: 'BAD_REQUEST', message: 'Nie znaleziono produktów'})

      const itemsWithPriceAndQuantity = itemsWithPrice.map(item => {
        const quantity = input.items?.find(i => i.id === item.id)?.quantity
        return {
          ...item,
          quantity
        }
      })

      if (!itemsWithPriceAndQuantity.length) throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Nie znaleziono produktów'
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

      if (!order) throw new TRPCError({code: 'BAD_REQUEST', message: 'Nie udało się utworzyć zamówienia'})

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

    if (!order) throw new TRPCError({code: 'BAD_REQUEST', message: 'Nie znaleziono zamówienia'})

    const items = await ctx.prisma.productOrderPivot.findMany({
      where: {
        orderId: order?.id
      },
    })

    if (!items) throw new TRPCError({code: 'BAD_REQUEST', message: 'Nie znaleziono produktów'})

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

    if (!itemsWithProduct) throw new TRPCError({code: 'BAD_REQUEST', message: 'Nie znaleziono produktów'})

    const itemsWithProductAndQuantity = itemsWithProduct.map(item => {
        const quantity = items?.find(i => i.productId === item.id)?.quantity
        return {
          ...item,
          quantity
        }
      }
    )

    if(!itemsWithProductAndQuantity) throw new TRPCError({code: 'BAD_REQUEST', message: 'Nie znaleziono produktów'})

    return {
      ...order,
      quantity: items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0),
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


    if (!order) throw new TRPCError({code: 'BAD_REQUEST', message: 'Nie znaleziono zamówienia'})

    return {...order, message: 'Zaktualizowano zamówienie'}
  }),
})



import {z} from "zod"
import {createTRPCRouter, publicProcedure} from "../trpc"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export const paymentRouter = createTRPCRouter({
  //@ deprecated
  // getPublishableKey: publicProcedure.query(async ({ctx}) => {
  //   return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  // }),

  addPaymentIntent: publicProcedure.input(z.object({
      orderId: z.string(),
    }
  )).mutation(async ({input, ctx}) => {
      const order = await ctx.prisma.order.findUnique({
        where: {
          id: input.orderId
        },
        select: {
          id: true,
          total: true,
        }
      })
      const paymentIntent = await stripe.paymentIntents.create({
        // @ts-ignore
        amount: (order?.total * 100),
        currency: "PLN",
        payment_method_types: ['card','p24','blik'],
        metadata: {integration_check: 'accept_a_payment'},
        return_url: `${process.env.BASE_URL}/store/checkout`,

      });
      return {
        clientSecret: paymentIntent.client_secret,
      }
    }
  )



  //end
})


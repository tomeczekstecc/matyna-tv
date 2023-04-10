import {blogRouter} from "./routers/blog"
import {exampleRouter} from "./routers/example"
import {createTRPCRouter} from "./trpc"
import {mediaRouter} from "./routers/media";
import {userRouter} from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  blog: blogRouter,
  example: exampleRouter,
  media: mediaRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

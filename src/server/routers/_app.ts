import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  addPostBlog: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { title, content } = input;
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
        },
      });
      return newPost;

    }),



});

// export type definition of API
export type AppRouter = typeof appRouter;

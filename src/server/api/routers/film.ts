import {z} from "zod"
import {adminProcedure, createTRPCRouter, publicProcedure} from "../trpc"
import {Film} from "@prisma/client";

const filmInput = z.object({
  id: z.string().optional(),
  title: z.string({required_error: 'Pole jest wymagane'}).min(3, 'Tytuł musi zawierać conajmniej 3 znaki ').max(100, 'Tytuł jest za długi: max 100 znaków'),
  subtitle: z.string().min(3, 'Podtytuł musi zawierać conajmniej 3 znaki ').max(100, 'Podtytuł jest za długi: max 300 znaków'),
  slug: z.string({required_error: 'Dodaj slug'}),
  url: z.string({required_error: 'Pole jest wymagane'}).url({message: 'Podaj prawidłowy adres url'}),
})


export const filmRouter = createTRPCRouter({
  addFilm: adminProcedure
    .input(filmInput)
    .mutation(async ({input, ctx}) => {


      const film = await ctx.prisma.film.create({
        data: {
          title: input.title,
          subtitle: input.subtitle,
          slug: input.slug,
          url: input.url,
          userId: ctx.user?.id,
        } as Film,
      })

      return {...film}
    }),
  getAllFilms: publicProcedure.query(({ctx}) => {
    //get all post with category

    return ctx.prisma.film.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        User: {
          select: {
            name: true,
            email: true,
          }
        }
      }

    })
  }),
  getOneFilm: publicProcedure.input(z.object({slug: z.string()})).query(async ({input, ctx}) => {
    return ctx.prisma.film.findUnique({
      where: {
        slug: input.slug
      },
      include: {
        User: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    })
  }),

  updateOneFilm: adminProcedure.input(filmInput).mutation(async ({input, ctx}) => {
    const film = await ctx.prisma.film.update({
      where: {
        id: input.id
      },
      data: {
        title: input.title,
        subtitle: input.subtitle,
        slug: input.slug,
        url: input.url,
      },
    })
    return {...film}
  }),
  deleteFilm: adminProcedure.input(z.object({id: z.string()})).mutation(async ({input, ctx}) => {
      await ctx.prisma.film.delete({
        where: {
          id: input.id
        }
      })
      return true
    }
  ),

})



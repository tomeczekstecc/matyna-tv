import Head from "next/head"
import BlogCard from "@/components/blogCard";
import {api} from "@/utils/api";
import FilmCard from "@/components/ui/filmCard";
import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function IndexPage() {
  const {data: posts, refetch: refetchPosts} = api.blog.getAllPosts.useQuery()
  const {data: films,  refetch: refetchFilms} = api.film.getAllFilms.useQuery()


  // @ts-ignore
  return (
    <>
      <Head>
        <title>MartynaTV</title>
        <meta
          name="description"
          content="Next.js template for building apps with Radix UI and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <section className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Witam na mojej stronce :) <br className="hidden sm:inline"/>
          Baw się dobrze!
        </h1>
        <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
          Na tej stronce obejrzysz moje filmy, które są związane z grami.
        </p>
      </section>

      <section>
        <h2 className={'mb-4 mt-10 text-3xl font-bold '}>Najnowsze wpisy bloga</h2>
        <div className={'grid grid-cols-1 gap-y-5 gap-x-10 lg:grid-cols-3'}>
          {posts?.slice(0, 3).map((post) => (
            <div key={post.id}>
              <BlogCard refetch={refetchPosts} key={post.id} post={post} featured={false} nosubtitle/>
            </div>
          ))
          }
        </div>
      </section>

      <div className={'flex gap-10'}>
        <section>
          <h2 className={'mb-4 mt-10 text-3xl font-bold '}>Najnowsze filmy</h2>
          <div className={'flex gap-4'}>
            {films?.slice(0, 2)?.map((film) => (
                <div key={film.id}>
                  <FilmCard
                    key={film.id}
                    film={film}
                    refetch={refetchFilms}
                  />
                </div>
              )
            )}
          </div>
        </section>

        <section>
          <h2 className={'mb-4 mt-10 text-3xl font-bold '}>Top promocje w sklepie</h2>
          <div className={'flex flex-col gap-2'}>
            {/*sklep w budowie*/}
            <div className={'text-2xl'}>
              Sklep w budowie
            </div>
            <Link type={'button'} href={'/store'}>
              <Button className={'text-xl'}>
                Wsparcie autora
              </Button>
            </Link>
          </div>
        </section>
      </div>

    </>
  )
}

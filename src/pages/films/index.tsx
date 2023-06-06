import React from "react"
import {Skeleton} from "@/components/ui/skeleton"
import FilmCard from "@/components/ui/filmCard"
import {Header} from "@/components/ui/Header"
import AdminAddContent from "@/components/AdminAddContent";
import {useSession} from "next-auth/react";
import {api} from "@/utils/api";

export default function index() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: session} = useSession()

  const {data: films, isLoading:isLoadingFilms, refetch} = api.film.getAllFilms.useQuery()

  return (
    <div>


      <div className={'flex gap-3 align-middle'}>
        <Header
          title={"Filmy"}
          subtitle={"Ciekawe filmy do obejrzenia"} className={'mb-8'}/>
        {session?.user?.role === 'ADMIN' && <AdminAddContent href={'/films/new'} tooltipText={'Dodaj film'}/>}
      </div>


      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        { isLoadingFilms && [1,2,3,4].map(i=> <Skeleton className="h-[340px] w-96 rounded-md bg-slate-200 dark:bg-slate-800"/>)}
        {films?.map((film) => {
          return (
            <FilmCard
              key={film.id}
              film={film}
              refetch={refetch}
            />
          )
        })}
      </section>
    </div>
  )
}

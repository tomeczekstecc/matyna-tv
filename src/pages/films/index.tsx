import React from "react"

import FilmCard from "@/components/ui/filmCard"
import {Header} from "@/components/ui/Header"
import filmsList from "../../data/films.json"
import AdminAddContent from "@/components/AdminAddContent";
import {useSession} from "next-auth/react";
import {api} from "@/utils/api";

export default function index() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: session} = useSession()

  const {data: films, refetch} = api.film.getAllFilms.useQuery()

  return (
    <>
      <div className={'flex gap-3 align-middle'}>
        <Header
          title={"Filmy"}
          subtitle={"Ciekawe filmy do obejrzenia"} className={undefined}/>
        {session?.user?.role === 'ADMIN' && <AdminAddContent href={'/films/new'} tooltipText={'Dodaj film'}/>}
      </div>
      <section className=" grid grid-cols-3 gap-4">
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
    </>
  )
}

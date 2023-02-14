import React from "react"

import FilmCard from "@/components/ui/filmCard"
import Header from "@/components/ui/header"
import filmsList from "../../data/films.json"

export default function FilmsPage() {
  return (
    <>
      <Header
        title={"Filmy"}
        subtitle={"Ciekawe filmy do obejrzenia"}
      />
      <section className="grid grid-cols-3 gap-4">
        {filmsList.map((film) => {
          return (
            <FilmCard
              key={film.createdAt}
              title={film.title}
              subtitle={film.subtitle}
              createdAt={film.createdAt}
              url={film.url}
            />
          )
        })}
      </section>
    </>
  )
}

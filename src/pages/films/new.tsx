'use client'
import {useState} from "react"
import {api} from "@/utils/api"
import BlogForm from "@/components/blogForm";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {clearError} from "@/lib/clearError";
import {useSession} from "next-auth/react";
import FilmForm from "@/components/filmForm";

type Film = {
  title: string
  subtitle: string
  slug: string
}

export default function NewFilmPage() {
  const {data: session} = useSession()

  const router = useRouter()
  const [film, setFilm] = useState<Film>({
    subtitle: "",
    title: "",
    slug: "",
  })
  const [errors, setErrors] = useState<any>(null)


  const {mutate: addFilm, isLoading} = api.film.addFilm.useMutation({
    onSuccess: async (data) => {
      toast.success('Film został dodany')
      return router.push(`/films`)
    },
    onError: async (error) => {
      setErrors(error?.data?.zodError?.fieldErrors as any)
      toast.error('Nie udało się dodać filmu')
    }
  })

  return (
    <FilmForm errors={errors} setErrors={setErrors} isLoading={isLoading} setFilm={setFilm} film={film}
              addFilm={addFilm}
              clearError={clearError}/>
  )
}

import {useRouter} from "next/router";
import {useState} from "react";
import {api} from "@/utils/api";
import {Film} from "@prisma/client";
import {clearError} from "@/lib/clearError";
import toast from "react-hot-toast";
import FilmForm from "@/components/filmForm";

const EditFilmPage = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [film, setFilm] = useState<Film>()
  const [errors, setErrors] = useState<any>(null)


  // @ts-ignore
  const {isLoading} = api.film.getOneFilm.useQuery({slug}, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setFilm(data as unknown as Film)
    }
  })
  const {
    mutate: updateFilm,
  } = api.film.updateOneFilm.useMutation({
    onSuccess: () => {
      return router.push('/films')
    },
    onError: (error) => {
      setErrors(error?.data?.zodError?.fieldErrors as any)
      toast.error('Nie udało się zapisać filmu')
    }
  })

  return (

    <FilmForm
      errors={errors} setErrors={setErrors} isLoading={isLoading} setFilm={setFilm} film={film}
      addFilm={updateFilm}
      clearError={clearError}/>

  );
};

export default EditFilmPage;

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import slugify from "slugify";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {categories} from "@/utils/options/cataegories";
import DialogModal from "@/components/dialog";
import Gallery from "@/components/gallery";
import Image from "next/image";
import {transformImg} from "@/utils/transformImg";
import WYSIWYG from "@/components/WYCIWYG";
import {Button} from "@/components/ui/button";
import {Header} from "@/components/ui/Header";
import {LoadingSpinner} from "@/components/loading";
import {blurURI} from "@/config/blutURI";
import {Validation} from "@/components/Validation";
import {useSession} from "next-auth/react";

const FilmForm = ({setFilm, film, addFilm, isLoading, errors, setErrors, clearError}) => {


  const handleChange = (key, value) => {
    setFilm((prev) => ({...prev, [key]: value}))
    clearError(errors, setErrors, key)
    if (key === 'title') {
      setFilm((prev) => ({...prev, slug: slugify(value, {lower: true})}))
    }
  }

  return (
    <div
      className={"container grid max-w-[980px] items-center gap-6 pt-6 pb-8 md:py-10"}>
      <Header title={'Dodaj lub edytuj film'} subtitle={'Wypełnij formularz poniżej'} className={'mb-10'}/>
      {!film ? <LoadingSpinner size={30}/> : <div>
        <div className={'flex flex-col justify-between gap-4'}>
          <div>
            <Label htmlFor={"title"} className={"mb-0"}>Tytuł</Label>
            <Validation errors={errors} field={'title'}>
              <Input
                className={`${errors?.title ? '!border-red-500' : ''}`}
                onChange={(e) => handleChange('title', e.target.value)}
                value={film.title}
                name={"title"}
                type="text"
                placeholder="Podaj tytuł"
              />
            </Validation>
          </div>
          <div>
            <Label htmlFor={"subtitle"} className={"mb-0"}>
              Podtytuł
            </Label>
            <Validation errors={errors} field={'subtitle'}>
              <Input
                className={`${errors?.title ? '!border-red-500' : ''}`}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                name={"subtitle"}
                type="text"
                placeholder="Podaj podtytuł"
                value={film.subtitle}
              />
            </Validation>
          </div>
          <div>
            <Label htmlFor={"url"} className={"mb-0"}>
              Adres filmu
            </Label>
            <Validation errors={errors} field={'url'}>
              <Input
                className={`${errors?.title ? '!border-red-500' : ''}`}
                onChange={(e) => handleChange('url', e.target.value)}
                name={"url"}
                type="text"
                placeholder="Podaj adres filmu"
                value={film.url}
              />
            </Validation>
          </div>
          <Button
            className={'mt-4 mr-2 w-full'}
            onClick={() => addFilm(film)}>
            {isLoading && <LoadingSpinner size={22}/>}

            Zapisz

          </Button>
        </div>
      </div>}
    </div>
  )
}
export default FilmForm

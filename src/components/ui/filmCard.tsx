'use client'
import React from "react"
import PropTypes from "prop-types"
import Ago from "@/components/Ago";
import Link from "next/link";
import {Edit, Trash} from "lucide-react";
import {useSession} from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/loading";
import {api} from "@/utils/api";
import toast from "react-hot-toast";

const FilmCard = ({film, refetch}) => {

  const {id, title, subtitle, slug, createdAt, url} = film

  const {data: session, status: authStatus} = useSession()
  const [open, setOpen] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(null)

  const {mutate: deleteFilm, isLoading} = api.film.deleteFilm.useMutation({
    onSuccess: () => {
      setOpen(false)
      refetch()
      toast.success('Film został usunięty')
    },
    onError: () => {
      toast.error('Wystąpił błąd podczas usuwania filmu')
    }
  })

  const handleOnDeleteClick = (id) => {
    setCurrentId(id)
    setOpen(true)
  }

  const dialogDelete = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogClose asChild onClick={() => setOpen(false)}/>
          <DialogTitle>Czy na pewno?</DialogTitle>
          <DialogDescription>
            Zamierzasz usunąć film o tytule {title}. Czy jesteś pewna/pewien? operacja jest
            nieodwracalna.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button color={'red'} onClick={() => setOpen(false)} type="submit">REZYGNUJĘ</Button>
          <Button onClick={() => deleteFilm({id})} variant={'destructive'} type="submit">{isLoading &&
            <div className={'mr-2'}><LoadingSpinner size={18}/></div>} usuwam</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )


  return (
    <div className={'relative'}>
      {dialogDelete}
      {(authStatus === 'authenticated' && session?.user?.role === 'ADMIN') &&
        <div
          className={"absolute top-4 left-4 flex gap-2 rounded border-2 border-slate-600 bg-slate-900 px-4 py-2 opacity-80"}>
          <Link title={'Edytuj film'} href={`/films/edit/${slug}`}>
            <Edit className={'text-white'} size={22}/>
          </Link>
          <div
            title={'Usuń film'}>
            <Trash onClick={() => handleOnDeleteClick(id)} size={22}
                   className={"text-red-600 hover:cursor-pointer dark:text-red-300"}/></div>
        </div>}
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <a href="#">
          <iframe
            className="h-56 w-full rounded-t-lg "
            src={url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <div className="flex justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
            <Ago user={'Martynka'} createdAt={createdAt}/>
          </div>
        </div>
      </div>
    </div>)
}

FilmCard.defaultProps = {
  createdAt: "2020-12-04",
  subtitle: "Subtittle",
  title: "Title",
}

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
}

export default FilmCard

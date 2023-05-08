import React from "react"
import PropTypes from "prop-types"
import Ago from "@/components/Ago";
import Link from "next/link";
import {Edit, Trash} from "lucide-react";
import {useSession} from "next-auth/react";

const FilmCard = ({film, refetch}) => {

  const {id, title, subtitle, slug, createdAt, url} = film

  const {data: session, status: authStatus} = useSession()
  const [open, setOpen] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(null)

  const handleOnDeleteClick = (id) => {
    setCurrentId(id)
    setOpen(true)
  }


  return (
    <div>
      {(authStatus === 'authenticated' && session?.user?.role === 'ADMIN') &&
        <div
          className={"absolute top-4 left-4 flex gap-2 rounded border-2 border-slate-600 bg-slate-900 px-4 py-2 opacity-80"}>
          <Link title={'Edytuj wpis'} href={`/blog/edit/${slug}`}>
            <Edit className={'text-white'} size={22}/>
          </Link>
          <div
            title={'Usuń wpis'}>
            <Trash onClick={() => handleOnDeleteClick(id)} size={22}
                   className={"text-red-600 hover:cursor-pointer dark:text-red-300"}/></div>
        </div>}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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

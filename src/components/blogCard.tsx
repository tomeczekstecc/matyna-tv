import Link from "next/link"
import {api} from "@/utils/api"
import {ArrowBigRight, Edit, Trash} from "lucide-react"
import {Button} from "@/components/ui/button"
import Category from "./Category"
import Ago from "@/components/Ago";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import React from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import {LoadingSpinner} from "@/components/loading";
import {blurURI} from "@/config/blutURI";

const BlogCard = ({post, refetch, featured}) => {
  const {data: session, status: authStatus} = useSession()
  const imgHeight = 500
  const imgWidth = 650
  const [open, setOpen] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(null)

  const {title, subtitle, slug, imgURL, category, createdAt} = post

  const {mutate: deletePost, isLoading} = api.blog.deletePost.useMutation({
    onSuccess: () => {
      toast.success('Wpis został usunięty')
      refetch()
    },
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
            Zamierzasz usunąć wpis bloga o tytule {title}. Czy jesteś pewna/pewien? operacja jest
            nieodwracalna.
            
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button color={'red'} onClick={() => setOpen(false)} type="submit">REZYGNUJĘ</Button>
          <Button onClick={() => deletePost({id: post.id})} variant={'destructive'} type="submit">{isLoading &&
            <div className={'mr-2'}><LoadingSpinner size={18}/></div>} usuwam</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )


  // @ts-ignore
  return (
    <div className={"relative"}>
      {dialogDelete}
      {(authStatus === 'authenticated' && session?.user?.role === 'ADMIN') &&
        <div
          className={"absolute top-4 left-4 flex gap-2 rounded border-2 border-slate-600 bg-slate-900 px-4 py-2 opacity-80"}>
          <Link title={'Edytuj wpis'} href={`/blog/edit/${slug}`}>
            <Edit className={'text-white'} size={22}/>
          </Link>
          <div
            title={'Usuń wpis'}>
            <Trash onClick={() => handleOnDeleteClick(post.id)} size={22}
                   className={"text-red-600 hover:cursor-pointer dark:text-red-300"}/></div>
        </div>}

      <Image
        placeholder={'blur'}
        blurDataURL={blurURI}
        className={"rounded-sm object-cover"}
        src={imgURL}
        alt="picture"
        width={imgWidth}
        height={imgHeight}
      />

      <div>
        <div className={'mt-2 flex items-center gap-3 align-middle'}>
          <Category data={{category}}/>
          <Ago createdAt={createdAt} user={'Martynka'}/>
        </div>

        <div className="flex flex-col justify-between leading-normal">
          <div>
            <h5
              className={`my-3 ${featured ? 'text-3xl' : 'text-2xl'} font-bold tracking-tight text-gray-900 dark:text-white`}>
              {title}
            </h5>
            <p className={`mb-3 ${featured ? 'text-xl' : ''} text-gray-600 dark:text-gray-400`}>
              {subtitle}
            </p>
            <Link className={`flex ${featured ? 'text-xl' : ''} items-center gap-1 hover:underline`}
                  href={`blog/${slug}`}> <span>Czytaj dalej</span>
              <ArrowBigRight/></Link>
          </div>


        </div>
      </div>


    </div>
  )
}

export default BlogCard

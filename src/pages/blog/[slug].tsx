import Image from "next/image"
import {useRouter} from "next/router"
import {api} from "@/utils/api"

import Ago from "@/components/Ago"
import Category from "@/components/Category"
import {blurURI} from "@/config/blutURI";
import {Button} from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";
import {LoadingSpinner} from "@/components/loading";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

``
const DetailBlogPage = () => {
  const router = useRouter()
  const {slug} = router.query
  const [open, setOpen] = React.useState(false)

  // @ts-ignore
  const {data, error, isLoading} = api.blog.getOnePost.useQuery({slug})


  const dialogComment = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogClose asChild onClick={() => setOpen(false)}/>
          <DialogTitle>Dodaj komentarz</DialogTitle>
          <DialogDescription>
            <Textarea/>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => null} variant={'subtle'} type="submit">{isLoading &&
            <div className={'mr-2'}><LoadingSpinner size={18}/></div>} Zapisz komentarz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )


  return (
    <div className={'cent'}>
      {dialogComment}
      <h1 className={"mb-4 text-4xl font-bold"}>{data?.title}</h1>
      <div className="flex gap-10">
        <Image
          className="rounded-lg"
          placeholder={'blur'}
          blurDataURL={blurURI}
          src={data?.imgURL!}
          width={600}
          height={400}
          alt={data?.title || "Blog Image"}
        />
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            Kategoria:
            <Category data={data}/>
          </div>
          <Ago user={"Martynka"} createdAt={data?.createdAt}/>

          <div>Id: {data?.id}</div>
          <Button onClick={() => setOpen(true)}>Dodaj komentarz</Button>
        </div>
      </div>
      <div className={'text-left'}>
        <h2 className="my-6 text-2xl italic">{data?.subtitle}</h2>
        <div dangerouslySetInnerHTML={{__html: data?.content as string}} className="mb-2 text-left"/>
      </div>
      <Button onClick={() => setOpen(true)}>Dodaj komentarz</Button>

    </div>
  )
}

export default DetailBlogPage

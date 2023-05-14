'use client'

import Image from "next/image"
import {useRouter} from "next/router"
import {api} from "@/utils/api"

import Ago from "@/components/Ago"
import Category from "@/components/Category"
import {blurURI} from "@/config/blutURI";
import {Button} from "@/components/ui/button";
import React, {useRef, useState} from "react";
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
import {Textarea} from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {Validation} from "@/components/Validation";
import {signIn, useSession} from "next-auth/react";
import dynamic from 'next/dynamic';
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const Comments = dynamic(() => import('@/components/comments'))



const AuthButton = ({authStatus, setOpen}) => {
  if (authStatus === 'authenticated') {
    return <Button onClick={() => setOpen(true)}>Dodaj komentarz</Button>
  } else if (authStatus === 'unauthenticated') {
    return <Button onClick={() => signIn()} variant={'subtle'}>Zaloguj się aby dodać
      komentarz</Button>
  } else return <LoadingSpinner size={20}/>
}


const DetailBlogPage = () => {
  const router = useRouter()
  const {status: authStatus} = useSession()
  const {slug} = router.query
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting

  const [open, setOpen] = React.useState(false)
  const [errors, setErrors] = useState<any>(null)
  const [content, setContent] = useState<string>('')

  // @ts-ignore
  const {data, isLoading} = api.blog.getOnePost.useQuery({slug})

  // @ts-ignore
  const {refetch} = api.comment.getBlogCommentsByPostId.useQuery({id: data?.id})
  const {mutate: addComment, isLoading: isCreating} = api.comment.addBlogComment.useMutation({
    onSuccess: () => {
      setOpen(false)
      refetch()
    },
    onError: (error) => {
      setErrors(error?.data?.zodError?.fieldErrors as any)
      if (error?.data?.zodError?.fieldErrors) toast.error('Nie udało się zapisać komentarza')
      if (error?.message && !error?.data?.zodError?.fieldErrors) toast.error(error?.message)
    }
  })
  // @ts-ignore


  const dialogComment = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogClose asChild onClick={() => setOpen(false)}/>
          <DialogTitle>Dodaj komentarz</DialogTitle>
          <DialogDescription>
            <Validation errors={errors} field={'content'}>
              <Textarea
                onChange={(e) => setContent(e.target.value)}
                className={`${errors?.content ? '!border-red-500' : ''}`}
              />
            </Validation>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => addComment({
            content,
            // @ts-ignore
            blogPostId: data?.id,
          })} type="submit">{isLoading &&
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
          <AuthButton authStatus={authStatus} setOpen={setOpen}/>
        </div>
      </div>
      <div className={'text-left'}>
        <h2 className="my-6 text-2xl italic">{data?.subtitle}</h2>
        <div dangerouslySetInnerHTML={{__html: data?.content as string}} className="mb-2 text-left"/>
      </div>
      <AuthButton authStatus={authStatus} setOpen={setOpen}/>
   <div ref={ref} >
      <Comments postId={data?.id}/>
    </div>
</div>
  )
}

export default DetailBlogPage

"use client"

import {Plus} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import {api} from "@/utils/api";
import {Header} from "@/components/ui/Header";
import {Suspense} from "react";
import Blog from "./components/Blog";
import Loading from "@/components/Loading";


export const metadata = {
  title: 'Blog',
}

export default function IndexPage() {
  const {data: posts, refetch, isLoading} = api.blog.getAllPosts.useQuery()

  // @ts-ignore
  if (isLoading) return <Loading/>
  return (

    <div className={'w-9/12 justify-self-center'}>
      <Header title={'Blog'} subtitle={'Najnowsze wpisy bloga'} className={undefined}/>
      {/*// TODO: only admin*/}
      <div className={'flex justify-between'}>
        <div>{' '}</div>
        <div className={'mb-3'}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={'blog/new'}>
                  <Button variant="outline" className="w-10 rounded-full p-0">
                    <Plus className="h-4 w-4"/>
                    <span className="sr-only">Dodaj wpis bloga</span>
                  </Button></Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dodaj wpis bloga</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider></div>
      </div>
      <div className={'grid grid-cols-1 gap-10'}
      >
        <Suspense fallback={<div>LOADING... LOADING...</div>}>
          <Blog refetch={refetch} posts={posts}/>
        </Suspense>
      </div>
    </div>
  )
}

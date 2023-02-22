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
import Image from "next/image";

export default function IndexPage() {
  const {data: posts} = api.blog.getAllPosts.useQuery()
  // @ts-ignore
  return (

    <div>
      {/*// TODO: only admin*/}
      <div className={'float-right'}>
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
        </TooltipProvider>
      </div>
      {posts?.map((post) => (
        <div key={post.id} className={'mb-4'}>
          <h1 className={'text-2xl font-bold'}>{post.title}</h1>
          <p className={'text-sm text-gray-500'}>{post.subtitle}</p>
          <p className={'text-sm text-gray-500'} dangerouslySetInnerHTML={{__html: post.content}} ></p>
          {/*// @ts-ignore*/}
          <Image src={post.imgURL} alt={'picture'} width={200} height={200} blurDataURL={'/noimage.jpg'}/>
        </div>
      ))}
    </div>
  )
}

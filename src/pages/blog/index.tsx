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
import BlogCard from "@/components/blogCard";

export default function IndexPage() {
  const {data: posts, refetch} = api.blog.getAllPosts.useQuery()
  const {mutate: deletePost} = api.blog.deletePost.useMutation({
    onSuccess: () => refetch()
  })
  // @ts-ignore
  return (
    <div>
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
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'}
      >
        {posts?.map((post) => (
          <BlogCard key={post.id} post={post}/>

        ))}
      </div>
    </div>
  )
}

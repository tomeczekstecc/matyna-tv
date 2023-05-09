"use client"

import {api} from "@/utils/api";
import {Header} from "@/components/ui/Header";
import {Suspense} from "react";
import Blog from "./components/Blog";
import {LoadingPage} from "@/components/loading";
import {useSession} from "next-auth/react";
import AdminAddContent from "@/components/AdminAddContent";


export const metadata = {
  title: 'Blog',
}

export default function IndexPage() {
  const {data: posts, refetch, isLoading} = api.blog.getAllPosts.useQuery()

  const {data: session} = useSession()

  // @ts-ignore
  if (isLoading) return <LoadingPage size={50}/>
  return (

    <div>
      <div className={'flex gap-3 align-middle'}>
        <Header title={'Blog'} subtitle={'Najnowsze wpisy bloga'} className={'mb-10'}/>
        {session?.user?.role === 'ADMIN' && <AdminAddContent href={'/blog/new'} tooltipText={'Dodaj wpis bloga'}/>}
      </div>
      <Suspense fallback={<LoadingPage size={50}/>}>
        <Blog refetch={refetch} posts={posts}/>
      </Suspense>
    </div>
  )
}

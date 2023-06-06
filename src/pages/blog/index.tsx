"use client"

import {api} from "@/utils/api";
import {Header} from "@/components/ui/Header";
import React, {Suspense} from "react";
import Blog from "./components/Blog";
import {LoadingPage} from "@/components/loading";
import {useSession} from "next-auth/react";
import AdminAddContent from "@/components/AdminAddContent";
import {Skeleton} from "@/components/ui/skeleton";


export const metadata = {
  title: 'Blog',
}

export default function IndexPage() {
  const {data: posts, refetch, isLoading} = api.blog.getAllPosts.useQuery()

  const {data: session} = useSession()

  // @ts-ignore
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

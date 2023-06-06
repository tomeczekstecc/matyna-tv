import BlogCard from "@/components/blogCard";
import {Skeleton} from "@/components/ui/skeleton";
import React from "react";
const SkeletonPostsFeatured = ({isLoading}) => {
  return<>{
    isLoading && [1,2].map(i =>
      <div className={'flex flex-col gap-4'}>
        <Skeleton className="h-[420px] w-[630px] rounded-md bg-slate-200 dark:bg-slate-800"/>
        <Skeleton className="h-[24px] w-[290px] rounded-md bg-slate-200 dark:bg-slate-800"/>
        <Skeleton className="h-[28px] w-[520px] rounded-md bg-slate-200 dark:bg-slate-800"/>
        <Skeleton className="h-[28px] w-[440px] rounded-md bg-slate-200 dark:bg-slate-800"/>
        <Skeleton className="h-[26px] w-[600px] rounded-md bg-slate-200 dark:bg-slate-800"/>
        <Skeleton className="h-[26px] w-[500px] rounded-md bg-slate-200 dark:bg-slate-800"/>
      </div>
    )
  }</>
}
const Blog = ({posts, refetch}) => {


  return (<div>
    {/*newest*/}
    <h2 className={'mb-4 text-2xl  '}>Najnowsze wpisy</h2>
    <div className={'mb-32 grid grid-cols-1 gap-y-10 gap-x-20 lg:grid-cols-2'}>
      <SkeletonPostsFeatured isLoading={!posts}/>
      {posts?.slice(0, 2).map((post) => (
        <div key={post.id}>
          <BlogCard featured refetch={refetch} key={post.id} post={post} nosubtitle={false}/></div>
      ))
      } </div>
    <h2 className={'mb-4 text-2xl '}>Pozostałe wpisy</h2>

    <div className={'grid grid-cols-1 gap-y-5 gap-x-10 lg:grid-cols-3 '}>
      {posts?.slice(2).map((post) => (
        <div key={post.id}>
          <BlogCard refetch={refetch} key={post.id} post={post} featured={false } nosubtitle={false}/></div>
      ))
      }
    </div>
  </div>)
}

export default Blog

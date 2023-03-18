import {Suspense} from "react"
import Image from "next/image"
import {useRouter} from "next/router"
import {api} from "@/utils/api"

import Ago from "@/components/Ago"
import Category from "@/components/Category"

const DetailBlogPage = () => {
  const router = useRouter()
  const {slug} = router.query

  // @ts-ignore
  const {data, error, isLoading} = api.blog.getOnePost.useQuery({slug})

  // @ts-ignore
  // @ts-ignore
  return (
    <div className={'cent'}>
      <h1 className={"mb-4 text-center text-5xl font-bold"}>{data?.title}</h1>
      <div className="flex justify-center gap-10">
        <Image
          className="rounded-lg"
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
        </div>
      </div>
      <div className={'text-left'}>
        <h2 className="my-6 text-2xl italic">{data?.subtitle}</h2>
        <div dangerouslySetInnerHTML={{__html: data?.content as string}} className="mb-2 text-left"/>
      </div>
    </div>
  )
}

export default DetailBlogPage

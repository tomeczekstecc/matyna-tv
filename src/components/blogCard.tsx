import Link from "next/link"
import {api} from "@/utils/api"
import {ArrowBigRight, Edit, Trash} from "lucide-react"

import Category from "./Category"
import Ago from "@/components/Ago";
import Image from "next/image";

const BlogCard = ({post, refetch, featured}) => {
  const imgHeight = 500
  const imgWidth = 650

  const {title, subtitle, slug, imgURL, category, createdAt} = post

  const {mutate: deletePost} = api.blog.deletePost.useMutation({
    onSuccess: () => refetch(),
  })


  // @ts-ignore
  return (
    <div className={"relative"}>

      <div
        className={"absolute top-4 left-4 flex gap-2 rounded border-2 border-slate-600 bg-slate-900 px-4 py-2 opacity-80"}>
        <Link title={'Edytuj wpis'} href={`/blog/edit/${slug}`}>
          <Edit size={22}/>
        </Link>
        <div onClick={() => deletePost({id: post.id})} title={'Usuń wpis'}>
          <Trash size={22}
                 className={"text-red-600 hover:cursor-pointer dark:text-red-300"}/></div>
      </div>

      <Image
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

import Link from "next/link"
import {api} from "@/utils/api"
import {transformImg} from "@/utils/transformImg"
import {ArrowRight, ChevronRightIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import Category from "./Category"
import Ago from "@/components/Ago";

const BlogCard = ({post, refetch}) => {
  const imgHeight = 300
  const imgWidth = 450

  const {title, subtitle, slug, imgURL, category, createdAt, content} = post

  const {mutate: deletePost} = api.blog.deletePost.useMutation({
    onSuccess: () => refetch(),
  })

  console.log(post, "post")

  // @ts-ignore
  return (
    <div className={"relative flex flex-col items-center gap-2 md:flex-row"}>
      <div className={"h-72 flex w-full"}>
        <Link

          href={`/blog/${slug}`}>
          <img
            className={"h-72 w-full rounded-lg object-cover"}
            src={transformImg(imgURL, imgWidth, imgHeight)}
            alt="picture"
          />
          <div className={"flex w-fit -translate-y-12 translate-x-3.5 gap-1"}>
            <Link href={`/blog/edit/${slug}`}>
              <Button size={"sm"}>Edytuj</Button>
            </Link>
            <Button
              size={"sm"}
              onClick={() => deletePost({id: post.id})}
              variant={"ghost"}
            >
              <span className={"text-red-600 dark:text-red-300"}>Usuń</span>
            </Button>
          </div>
        </Link>

      </div>
      <div className={"flex h-72 w-full flex-col justify-between"}>
        <div className="flex h-72 flex-col justify-between leading-normal">
          <div>
            <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-black text-gray-700 dark:text-gray-400">
              {subtitle}
            </p>
            <p
              className={'block mb-3 w-full overflow-hidden text-ellipsis text-gray-700 dark:text-gray-400'}
              dangerouslySetInnerHTML={{__html: content.slice(0, 150) + '...'}}
            ></p>

            <Link className={'hover:underline'} href={`blog/${slug}`}>Czytaj dalej</Link>
          </div>

          <div className={" flex items-center gap-6"}>
            <Ago createdAt={createdAt} user={'Martynka'}/>
          </div>
        </div>
      </div>


      <div className={` absolute left-2 top-2 flex gap-1`}>
        <Category data={{category}}/>
      </div>
    </div>
  )
}

export default BlogCard

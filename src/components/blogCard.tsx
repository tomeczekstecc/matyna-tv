import Link from "next/link";
import Image from "next/image";
import {api} from "@/utils/api";
import {formatDistance} from "date-fns";
import {Button} from "@/components/ui/button";
import {transformImg} from "@/utils/transformImg";
import {ArrowRight, ChevronRightIcon} from "lucide-react";
import pl from "date-fns/esm/locale/pl"

const BlogCard = ({post, refetch}) => {
  const imgHeight = 300
  const imgWidth = 450

  const {title, subtitle, slug, imgURL, category, createdAt, content} = post

  const {mutate: deletePost} = api.blog.deletePost.useMutation({
    onSuccess: () => refetch(),
  })

  console.log(post, 'post')

  // @ts-ignore
  return (
    <div className={'relative flex flex-auto flex-col items-center gap-4 md:flex-row'}>
      <Link className={'flex h-72 w-full rounded-lg object-cover shadow-md'} href={`/blog/${slug}`}>

        <img className={'w-full rounded-lg object-cover shadow-md'}
             src={transformImg(imgURL, imgWidth, imgHeight)} alt="picture"/>
      </Link>
      <div className={'flex h-72 w-full flex-col justify-between'}>

        <div className="flex h-72 flex-col justify-between p-1 leading-normal">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>

            <p dangerouslySetInnerHTML={{__html: content}}
               className="mb-3 max-h-32 overflow-hidden font-normal text-gray-700 dark:text-gray-400"></p>
          </div>

          <div className={'flex items-center gap-6'}>


            {/*// @ts-ignore*/}
            <div>
              <span className="mb-3 italic font-semibold text-gray-700 dark:text-gray-400">{'Martyna '}</span> -{" "}
              <span className="mb-3 italic font-semibold text-gray-700 dark:text-gray-400">
              {formatDistance(new Date(createdAt), new Date(), {
                locale: pl,
                addSuffix: true,
              })}{" "}
            </span>
            </div>
            <Link href={`blog/${slug}`}>
              <Button>
                <ArrowRight className={'mr-2'}/>
                Czytaj dalej
              </Button>
            </Link>
          </div>
        </div>


      </div>
      <div className={'absolute left-2 bottom-2 flex gap-1'}>
        <Link href={`/blog/edit/${slug}`}>
          <Button size={'sm'}>Edytuj</Button>
        </Link>
        <Button size={'sm'} onClick={() => deletePost({id: post.id})} variant={'ghost'}><span
          className={'text-red-600 dark:text-red-300'}>Usuń</span></Button>
      </div>

      <div style={{backgroundColor: category.color}}
           className={`text-sm text-amber-50 dark:text-amber-50 rounded p-1 absolute left-2 top-2 flex gap-1`}>{category.name}
      </div>
    </div>

  )
}

export default BlogCard

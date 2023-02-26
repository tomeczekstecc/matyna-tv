import Link from "next/link";
import Image from "next/image";
import {api} from "@/utils/api";
import {Button} from "@/components/ui/button";
import {transformImg} from "@/utils/transformImg";

const BlogCard = ({post}) => {
  const imgHeight = 300
  const imgWidth = 450

  const {title, subtitle, slug, imgURL, category, createdAt, content} = post

  const {data: posts, refetch} = api.blog.getAllPosts.useQuery()
  const {mutate: deletePost} = api.blog.deletePost.useMutation({
    onSuccess: () => refetch()
  })

  return (
    <div className={'my-10'}>

      {/*<div*/}
      {/*  className="min-h-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">*/}
      {/*  <span*/}
      {/*    className={`absolute m-2 mr-2 rounded bg-${color}-100 px-2.5 py-0.5 text-xs font-medium text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`}>kategoria: {category.name}</span>*/}
      {/*  <Link href={slug}>*/}
      {/*    <img className="rounded-t-lg" src={transformImg(imgURL, 400, 300)} alt={subtitle}/>*/}
      {/*  </Link>*/}
      {/*  <div className="flex h-60 flex-col justify-between p-5">*/}
      {/*    <div>*/}
      {/*      <a href="#">*/}
      {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>*/}
      {/*      </a>*/}
      {/*      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>*/}
      {/*    </div>*/}
      {/*    <div className={'flex justify-between'}>*/}
      {/*      <Link href={slug}*/}
      {/*            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">*/}
      {/*        Czytaj dalej*/}
      {/*        <svg aria-hidden="true" className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"*/}
      {/*             xmlns="http://www.w3.org/2000/svg">*/}
      {/*          <path fillRule="evenodd"*/}
      {/*                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"*/}
      {/*                clipRule="evenodd"></path>*/}
      {/*        </svg>*/}
      {/*      </Link>*/}
      {/*      <div className={'flex justify-start'}>*/}
      {/*        <div className={'flex gap-1'}>*/}
      {/*          <Button size={'sm'} variant={'outline'}>Edytuj</Button>*/}
      {/*          <Button size={'sm'} onClick={() => deletePost({id: post.id})} variant={'ghost'}><span*/}
      {/*            className={'text-red-300'}>Usuń</span></Button>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*  </div>*/}
      {/*</div>*/}

      <a href="#"
         className="flex flex-col gap-4 items-center md:flex-row w-full">

        <img className="object-cover w-full h-64 rounded-lg shadow-md"
             src={transformImg(imgURL, imgWidth, imgHeight)} alt="picture"/>
        <div className={'h-64 flex flex-col justify-between w-full'}>
          <div className="flex flex-col justify-between p-1 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
            <p  dangerouslySetInnerHTML={{__html: content}}
               className="mb-3 max-h-32 overflow-hidden font-normal text-gray-700 dark:text-gray-400"></p>
          </div>

          <div className={'flex gap-1'}>
                      <Button size={'sm'} variant={'outline'}>Edytuj</Button>
                      <Button size={'sm'} onClick={() => deletePost({id: post.id})} variant={'ghost'}><span
                        className={'text-red-500 dark:text-red-300'}>Usuń</span></Button>
          </div>
        </div>
      </a>


      {/*  <Image blurDataURL={'/noimage.jpg'} src={transformImg(imgURL, imgHeight, imgWidth)} height={imgHeight} width={imgWidth}*/}
      {/*         alt={subtitle}/>*/}


      {/*<div className={'flex h-full w-full flex-col justify-between'}>*/}
      {/*  <div>*/}
      {/*    <Link href={`/blog/${slug}`}>*/}
      {/*      <h3  className={'mb-1 text-2xl font-bold'}>{title}</h3>*/}
      {/*    </Link>*/}
      {/*    <p className={'mb-2 text-sm'}>{subtitle}</p>*/}
      {/*    <p className={'max-h-20 overflow-hidden'} dangerouslySetInnerHTML={{__html:content}} ></p>*/}
      {/*    <Link href={`/blog/${slug}`}>*/}
      {/*      <p className={'text-sm text-gray-500'}>Czytaj dalej...</p>*/}
      {/*    </Link>*/}
      {/*    <p>{createdAt?.[0]}</p>*/}
      {/*  </div>*/}
      {/*  <div className={'flex justify-start'}>*/}

      {/*    <div className={'flex gap-1'}>*/}
      {/*      <Button size={'sm'} variant={'outline'}>Edytuj</Button>*/}
      {/*      <Button size={'sm'} onClick={() => deletePost({id: post.id})} variant={'destructive'}>Usuń</Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>

  )
}

export default BlogCard

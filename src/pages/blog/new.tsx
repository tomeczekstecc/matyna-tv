'use client'
import {useState} from "react"
import {api} from "@/utils/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import slugify from "slugify"
import WYSIWYG from "@/components/WYCIWYG"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {categories} from "@/utils/options/cataegories";
import Image from "next/image";
import DialogModal from "@/components/dialog";
import Gallery from "@/components/gallery";
import {transformImg} from "@/utils/transformImg";
import {mapImages, search} from "@/lib/cloudinary";
import {AxiosCloudinary} from "@/utils/axios";

type Post = {
  title: string
  subtitle: string
  categoryId: string
  content: string
  imgURL: string
  slug: string
}


export async function getStaticProps(ctx) {
  const res = await search({
    max_results: 12,
    // expression: 'folder:""' // root folder
    expression: 'folder:martyna-tv'

  })

  const {resources, next_cursor: nextCursor} = res

  const images = mapImages(resources)

  return {
    props: {
      data: images,
      nextCursor: nextCursor || ''
    },
    revalidate: 10
  }
}


export default function NewBlogPage(props) {
  const [post, setPost] = useState({
    subtitle: "",
    title: "",
    content: "",
    categoryId: "Gry",
    imgURL: "",
    slug: "",
  })

  const {mutate: addBlog} = api.blog.addBlogPost.useMutation({})
  const [images, setImages] = useState(props.data)
  const [nextCursor, setNextCursor] = useState(props.nextCursor)
  const handleLoadMore = async (event) => {
    if (!nextCursor) return
    event.preventDefault();
    const res = await AxiosCloudinary.post('/api/cloudinary/search', {next_cursor: nextCursor})
    const {resources, next_cursor: updatedNextCursor} = res.data
    const images = mapImages(resources)
    setImages(prev => [...prev, ...images])
    setNextCursor(updatedNextCursor)

  }
  return (
    <div
      className={
        "container grid  max-w-[980px] items-center gap-6 pt-6 pb-8 md:py-10"
      }
    >

      <div>
        <Label htmlFor={"title"} className={"mb-0"}>
          Tytuł
        </Label>
        <Input
          onChange={(e) => {
            setPost((prev) => ({...prev, title: e.target.value}))
            setPost((prev) => ({...prev, slug: slugify(e.target.value, {lower: true})}))
          }}


          value={post.title}
          name={"title"}
          type="text"
          placeholder="Podaj tytuł"
        />
      </div>
      <div>
        <Label htmlFor={"subtitle"} className={"mb-0"}>
          Podtytuł
        </Label>
        <Input
          onChange={(e) =>
            setPost((prev) => ({...prev, subtitle: e.target.value}))}
          name={"subtitle"}
          type="text"
          placeholder="Podaj podtytuł"
          value={post.subtitle}
        />
      </div>
      <div>
        <Label htmlFor={"category"} className={"mb-0"}>
          Kategoria
        </Label>

        <Select
          value={post.categoryId}
          name={"category"}
          onValueChange={(value) => setPost((prev) => ({...prev, categoryId: value}))}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz kategorię"/>
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <article className={'my-6'}>
          <Label htmlFor={"iamge"} className={"mb-0"}>
            Wybierz zdjęcie
          </Label>
          <span className={'pl-2'}>
          <DialogModal>
            <Gallery data={images} setCurUrl={(e) => setPost((prev) => ({...prev, imgURL: e}))}/>
            <Button className={'my-10'} disabled={!nextCursor} onClick={handleLoadMore}>Załaduj więcej zdjęć</Button>

          </DialogModal>
      </span>
        </article>
        {post.imgURL &&
          <Image blurDataURL={'/noimage.jpg'} src={transformImg(post.imgURL, 500, 600)} alt={'image to upload'}
                 height={200} width={200}/>
        }
      </div>
      <WYSIWYG value={post.content} onChange={e => setPost(prev => ({...prev, content: e}))}/>
      <Button onClick={() => addBlog(post)}>Zapisz</Button>
    </div>
  )
}

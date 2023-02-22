import {useState} from "react"
import {api} from "@/utils/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import WYSIWYG from "@/components/WYCIWYG"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {categories} from "@/utils/options/cataegories";
import Image from "next/image";
import DialogModal from "@/components/dialog";
import Gallery from "@/components/gallery";

type Post = {
  title: string
  subtitle: string
  categoryId: string
  content: string
  imgURL: string

}


export async function getServerSideProps(ctx) {
  const res = await fetch('https://api.cloudinary.com/v1_1/dgii182dt/resources/image', {
    headers: {
      Authorization: `Basic  ${Buffer.from('187784577678993' + ':' + 'JicWO-F4j7QvBeoWBUBg05x0oEw').toString('base64')}`

    }
  })

  const data = await res.json()
  return {
    props: {
      data
    }
  }
}


export default function NewBlogPage(props) {
  const [post, setPost] = useState({
    subtitle: "",
    title: "",
    content: "",
    categoryId: "Gry",
    imgURL:  "",
  })

  const {mutate} = api.blog.addBlogPost.useMutation({})



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
          onChange={(e) =>
            setPost((prev) => ({...prev, title: e.target.value}))
          }
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
            setPost((prev) => ({...prev, subtitle: e.target.value}))
          }
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
            <Gallery data={props.data} setCurUrl={(e)=>setPost((prev) => ({...prev, imgURL: e}))}/>
          </DialogModal>
      </span>
        </article>
        {post.imgURL &&
          <Image blurDataURL={'/noimage.jpg'} src={post.imgURL} alt={'image to upload'} height={200} width={200}/>
        }


      </div>
      <WYSIWYG value={post.content} onChange={e => setPost(prev => ({...prev, content: e}))}/>
      <Button onClick={() => mutate(post)}>Zapisz</Button>
    </div>
  )
}

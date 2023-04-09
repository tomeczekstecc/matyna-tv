import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import slugify from "slugify";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {categories} from "@/utils/options/cataegories";
import DialogModal from "@/components/dialog";
import Gallery from "@/components/gallery";
import Image from "next/image";
import {transformImg} from "@/utils/transformImg";
import WYSIWYG from "@/components/WYCIWYG";
import {Button} from "@/components/ui/button";
import {Header} from "@/components/ui/Header";
import router from "next/router";

const BlogForm = ({setPost, post, addBlog}) => {
  return (
    <div
      className={
        "container grid  max-w-[980px] items-center gap-6 pt-6 pb-8 md:py-10"
      }
    >

      <div>
        <Header title={'Dodaj lub edytuj wpis bloga'} subtitle={'Wypełnij formularz poniżej'} className={'mb-10'}/>
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
          <Label htmlFor={"iamge"} className={"mb-0"}>Wybierz zdjęcie</Label>
          <span className={'pl-2'}>
          <DialogModal>
            <Gallery setCurUrl={(e) => setPost((prev) => ({...prev, imgURL: e}))}/>
          </DialogModal>
      </span>
        </article>
        {post.imgURL &&
          <Image blurDataURL={'/noimage.jpg'} src={transformImg(post.imgURL, 450, 300)} alt={'image to upload'}
                 height={300} width={450}/>
        }
      </div>
      <WYSIWYG value={post.content} onChange={e => setPost(prev => ({...prev, content: e}))}/>
      <Button onClick={() => {
        addBlog(post)
        router.push('/blog')
      }}>Zapisz</Button>
    </div>
  )
}
export default BlogForm

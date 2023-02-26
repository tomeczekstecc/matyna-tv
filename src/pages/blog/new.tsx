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
import BlogForm from "@/components/blogForm";

type Post = {
  title: string
  subtitle: string
  categoryId: string
  content: string
  imgURL: string
  slug: string
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

  return (
    <BlogForm setPost={setPost} post={post} addBlog={addBlog}/>
  )
}

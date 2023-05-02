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
import toast from "react-hot-toast";
import {LoadingPage} from "@/components/loading";
import {useRouter} from "next/router";

type Post = {
  title: string
  subtitle: string
  categoryId: string
  content: string
  imgURL: string
  slug: string
}

export default function NewBlogPage(props) {
  const router = useRouter()
  const [post, setPost] = useState({
    subtitle: "",
    title: "",
    content: "",
    categoryId: "Gry",
    imgURL: "",
    slug: "",
  })

  const {mutate: addBlog, isLoading} = api.blog.addBlogPost.useMutation({
    onSuccess: async (data) => {
      toast.success('Post został dodany')
      router.push(`/blog/${data.slug}`)
    },
    onError: async (e) => {
      toast.error('Nie udało się dodać postu')
    }
  })

  return (
    <BlogForm isLoading={isLoading} setPost={setPost} post={post} addBlog={addBlog}/>
  )
}

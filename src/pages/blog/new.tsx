'use client'
import {useState} from "react"
import {api} from "@/utils/api"
import BlogForm from "@/components/blogForm";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

type BlogPost = {
  title: string
  subtitle: string
  categoryId: string
  content: string
  imgURL: string
  slug: string
}

export default function NewBlogPage(props) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost>({
    subtitle: "",
    title: "",
    content: "",
    categoryId: "Gry",
    imgURL: "",
    slug: "",
  })
  const [errors, setErrors] = useState<any>(null)

  const {mutate: addBlog, isLoading} = api.blog.addBlogPost.useMutation({
    onSuccess: async (data) => {
      toast.success('Post został dodany')
      return router.push(`/blog/${data.slug}`)
    },
    onError: async (error) => {
      console.log(error?.data, 'data')
      console.log(error?.message, 'message')
      console.log(error?.shape, 'shape')
      setErrors(error?.data?.zodError?.fieldErrors as any)
      toast.error('Nie udało się dodać postu')
    }
  })

  return (
    <BlogForm errors={errors} isLoading={isLoading} setPost={setPost} post={post} addBlog={addBlog}/>
  )
}

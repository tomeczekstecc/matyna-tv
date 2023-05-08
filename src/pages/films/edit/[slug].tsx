import {useRouter} from "next/router";
import BlogForm from "@/components/blogForm";
import {useState} from "react";
import {api} from "@/utils/api";
import {BlogPost} from "@prisma/client";
import {clearError} from "@/lib/clearError";
import toast from "react-hot-toast";

const EditBlogPage = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [post, setPost] = useState<BlogPost>()
  const [errors, setErrors] = useState<any>(null)


  // @ts-ignore
  const {isLoading} = api.blog.getOnePost.useQuery({slug}, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPost(data as BlogPost)
    }
  })
  const {
    mutate: updatePost,
  } = api.blog.updateOnePost.useMutation({
    onSuccess: () => {
      return router.push('/blog')
    },
    onError: (error) => {
      setErrors(error?.data?.zodError?.fieldErrors as any)
      toast.error('Nie udało się zapisać postu')
    }
  })

  return (

    <BlogForm
      errors={errors} setErrors={setErrors} isLoading={isLoading} setPost={setPost} post={post}
      addBlog={updatePost}
      clearError={clearError}/>

  );
};

export default EditBlogPage;

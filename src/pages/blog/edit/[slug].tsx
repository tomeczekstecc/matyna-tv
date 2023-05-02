import {useRouter} from "next/router";
import BlogForm from "@/components/blogForm";
import {Suspense, useEffect, useState} from "react";
import {api} from "@/utils/api";
import {is} from "date-fns/locale";
import {LoadingSpinner, LoadingPage} from "@/components/loading"
import Blog from "@/pages/blog/components/Blog";
import {BlogPost} from "@prisma/client";

const EditBlogPage = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [post, setPost] = useState<BlogPost>()

  // @ts-ignore
  const {data: postData, isLoading} = api.blog.getOnePost.useQuery({slug}, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPost(data as BlogPost)
    }
  })
  const {
    mutate: updatePost,
    isLoading: isUpdating
  } = api.blog.updateOnePost.useMutation({onSuccess: () => router.push('/blog')})

  return (
    <div>
      <BlogForm setPost={setPost} post={post} addBlog={updatePost} isLoading={isLoading || isUpdating}/>
    </div>
  );
};

export default EditBlogPage;

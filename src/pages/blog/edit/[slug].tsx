import {useRouter} from "next/router";
import BlogForm from "@/components/blogForm";
import {Suspense, useEffect, useState} from "react";
import {api} from "@/utils/api";
import {is} from "date-fns/locale";
import {LoadingSpinner, LoadingPage} from "@/components/loading"

const EditBlogPage = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [post, setPost] = useState()

  // @ts-ignore
  const {data: postData, isLoading} = api.blog.getOnePost.useQuery({slug}, {refetchOnWindowFocus: false})
  const {mutate: updatePost} = api.blog.updateOnePost.useMutation({onSuccess: () => router.push('/blog')})


  useEffect(() => {
    // @ts-ignore

    setPost(postData)

  }, [postData])

  if (!post) return <div>...</div>

  return (
    <div>
      {isLoading && <LoadingPage/>}
      <Suspense fallback={<LoadingPage/>}>
        <BlogForm setPost={setPost} post={post} addBlog={updatePost}/>
      </Suspense>
    </div>
  );
};

export default EditBlogPage;

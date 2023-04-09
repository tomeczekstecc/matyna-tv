import {useRouter} from "next/router";
import BlogForm from "@/components/blogForm";
import {Suspense, useEffect, useState} from "react";
import {api} from "@/utils/api";
import {is} from "date-fns/locale";
import Loading from "@/components/Loading";

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
      {isLoading && <Loading/>}
      <Suspense fallback={<div>LOADING... LOADING...</div>}>
        <BlogForm setPost={setPost} post={post} addBlog={updatePost}/>
      </Suspense>
    </div>
  );
};

export default EditBlogPage;

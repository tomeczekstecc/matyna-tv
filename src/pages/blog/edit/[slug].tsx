import {useRouter} from "next/router";
import BlogForm from "@/components/blogForm";
import {useEffect, useState} from "react";
import {api} from "@/utils/api";

const EditBlogPage = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [post, setPost] = useState()

  // @ts-ignore
  const {data: postData, isLoading} = api.blog.getOnePost.useQuery({slug}, {refetchOnWindowFocus: false})
  const {mutate: updatePost} = api.blog.updateOnePost.useMutation()


  useEffect(() => {
    // @ts-ignore

    setPost(postData)

  }, [postData])

  if (!post) return <div>...</div>

  return (
    <div>
      <BlogForm setPost={setPost} post={post} addBlog={updatePost}/>
    </div>
  );
};

export default EditBlogPage;

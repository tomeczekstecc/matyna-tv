import {useRouter} from "next/router";
import BlogForm from "@/components/blogForm";
import {useState} from "react";
import {api} from "@/utils/api";
import {BlogPost} from "@prisma/client";

const EditBlogPage = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [post, setPost] = useState<BlogPost>()

  // @ts-ignore
  const {isLoading} = api.blog.getOnePost.useQuery({slug}, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPost(data as BlogPost)
    }
  })
  const {
    mutate: updatePost,
    isLoading: isUpdating
  } = api.blog.updateOnePost.useMutation({
    onSuccess: () => {
      return router.push('/blog')
    },
    useErrorBoundary: true,
    onError: (error) => {
      console.log(error, 'errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    }
  })

  return (
    <div>
      <BlogForm errors={[]} setPost={setPost} post={post} addBlog={updatePost} isLoading={isLoading || isUpdating}/>
    </div>
  );
};

export default EditBlogPage;

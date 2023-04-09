import {Suspense} from "react";
import BlogCard from "@/components/blogCard";

const Blog = ({posts, refetch}) => {
  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id} className={'mb-6'}>
          <BlogCard refetch={refetch} key={post.id} post={post}/></div>
      ))
      } </div>)
}

export default Blog

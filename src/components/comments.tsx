import {api} from "@/utils/api";
import {LoadingSpinner} from "@/components/loading";
import React from "react";
import {useSession} from "next-auth/react";
import Comment from "@/components/comment";


const Comments = ({postId}) => {

  const {data: comments, isLoading,refetch} = api.comment.getBlogCommentsByPostId.useQuery({id: postId})
  if (isLoading) return <LoadingSpinner size={30}/>
  if (!comments || comments?.length === 0) return <div className={'mt-10'}>Brak komentarzy</div>

  return (
    <div className={'m-6 w-3/4'}>
      <div className={'text-2xl font-bold'}>Komentarze</div>
      {comments.map(c => {
        return <Comment comment={c} refetch={refetch}/>
      })
      }

    </div>
  )
}

export default Comments

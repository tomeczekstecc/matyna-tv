import {api} from "@/utils/api";
import {LoadingSpinner} from "@/components/loading";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Ago from "@/components/Ago";
import Link from "next/link";
import {Edit, Trash} from "lucide-react";
import React from "react";
import {useSession} from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import toast from "react-hot-toast";


const Comment = ({comment, refetch}) => {

  const {data: session} = useSession()
  const {mutate: deleteComment, isLoading} = api.comment.deleteBlogPostComment.useMutation({
    onSuccess: () => {
      setOpenDelete(false)
      refetch()
      toast.success('Komentarz został usunięty')
    },
    onError: () => {
      toast.error('Wystąpił błąd podczas usuwania komentarza')
    }
  }
  )

  const {mutate: updateComment, isLoading: isEditing} = api.comment.updateOneBlogPostComment.useMutation({
    onSuccess: () => {
      setOpenEdit(false)
      refetch()
      toast.success('Komentarz został zaktualizowany')
    },
    onError: () => {
      toast.error('Wystąpił błąd podczas aktualizacji komentarza')
    }
  }
  )


  const [openDelete, setOpenDelete] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [type, setType] = React.useState('')
  const [content, setContent] = React.useState(comment.content)

  const manage = () =>
    <div
      className={"flex gap-2 px-4 py-2 opacity-80 hover:cursor-pointer"}>

      <div   title={'Edytuj wpis'} >
      <Edit onClick={() => {
        setOpenEdit(true)
        setType('edit')
      }} className={'text-slate-900 dark:text-white'} size={18}/></div>
      <div
        title={'Usuń wpis'}>
        <Trash onClick={() => {
          setOpenDelete(true)
          setType('delete')
        }} size={18}
               className={"text-red-600 hover:cursor-pointer dark:text-red-300"}/>
      </div>
    </div>


  const modal = (type) => {
    const openModal = type === 'delete' ? setOpenDelete : setOpenEdit
    const open = type === 'delete' ? openDelete : openEdit
    const textButton = type === 'delete' ? 'usuwam' : 'zapisz zmiany'
    const textTitle = type === 'delete' ? 'Usuń komentarz' : 'Edytuj komentarz'
    const action = type === 'delete' ? deleteComment : updateComment
    const form = <div>
      <div className="grid gap-4 py-4">
        <Textarea id="content" onChange={e=>setContent(e.target.value)} value={content}/>
      </div>
    </div>
    const description = type === 'delete' ? `Zamierzasz usunąć komentarz. Czy na pewno?` : form
    return <Dialog open={open} onOpenChange={openModal}>
      <DialogContent>
        <DialogHeader>
          <DialogClose asChild onClick={() => openModal(false)}/>
          <DialogTitle>{textTitle}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button color={'red'} onClick={() => openModal(false)} type="submit">REZYGNUJĘ</Button>
            {/*// @ts-ignore*/}
          <Button onClick={() => action({
            id: comment.id,
            content: content,
            blogPostId: comment.blogPostId
          })} variant={'destructive'} type="submit">
            {
              isLoading &&
              <div className={'mr-2'}><LoadingSpinner size={18}/></div>} {textButton}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  }


  return (
    <div key={comment.key}>
      {modal(type)}
      <div className={'my-6'}>
        <div className={'flex gap-4'}>

          <Avatar>
            <AvatarImage className={'text-white'} src={comment?.User?.image || '/unknownUser.svg'}
                         alt={comment?.User?.name || comment?.User?.email || 'logo użytkownika'}/>
            <AvatarFallback>{comment?.User?.name || 'UN'}</AvatarFallback>
          </Avatar>
          <div className={'flex flex-col'}>
            <div className={'flex items-center'}><Ago user={comment?.User?.name || comment?.User?.email}
                                                      createdAt={comment?.createdAt}/>
              {session?.user?.id === comment?.User?.id && manage()}</div>
            <div className={'relative text-sm'}> {comment?.content}</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment

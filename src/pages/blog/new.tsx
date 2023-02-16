import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import WYSIWYG from "@/components/WYCIWYG";
import {useState} from "react";

export default function NewBlogPage() {

  const [post] = useState({
    title: '',
    subtitle: '',
    category: '',
    content: '',
    image: '',
  })

  return (
    <div className={"container grid  max-w-[980px] items-center gap-6 pt-6 pb-8 md:py-10"}>
      <div>
        <Label htmlFor={'title'} className={'mb-0'} >Tytuł</Label>
        <Input name={'title'} type="text" placeholder="Podaj tytuł" />
      </div>
      <div>
        <Label htmlFor={'subtitle'} className={'mb-0'} >Podtytuł</Label>
        <Input name={'subtitle'} type="text" placeholder="Podaj
       podtytuł" />
      </div>
      <div>
        <Label htmlFor={'category'} className={'mb-0'} >Kategoria</Label>
        <Input name={'category'} type="text" placeholder="Podaj
       kategorię" />
      </div>
      <WYSIWYG />

    </div>
  )
}

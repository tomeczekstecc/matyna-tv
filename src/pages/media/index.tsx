import {Suspense, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";
import Image from "next/image";
import {Header} from "@/components/ui/Header";
import Gallery from "@/components/gallery";
import {transformImg} from "@/utils/transformImg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {LoadingSpinner} from "@/components/loading";
import {blurURI} from "@/config/blutURI";

export default function MediaPage(props) {

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const clear = () => {
    setImageSrc(undefined);
    setUploadData(undefined);
  }

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    clear()
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // @ts-ignore
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget
    // @ts-ignore
    const fileInput = Array.from(form.elements).find(el => el.name === 'file')
    const formData = new FormData();
    // @ts-ignore
    for (const file of fileInput.files) {
      formData.append('file', file)
    }
    formData.append('upload_preset', 'martyna-tv')
    const data = await fetch('https://api.cloudinary.com/v1_1/dgii182dt/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    setImageSrc(data.secure_url)
    setUploadData(data)
  }

  return (
    <main>
      <Tabs defaultValue="images">
        <TabsList>
          <TabsTrigger value="upload">Prześlij zdjęcia</TabsTrigger>
          <TabsTrigger value="images">Przesłane zdjęcia</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <section className={'flex-1'}>
            <Header title={'Wyślij media'} subtitle={'tutaj wybierz i wyślij plik'} className={undefined}/>
            <form className={'mt-9'} method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
              <input type="file" name="file"/>
              {imageSrc && !uploadData &&
                <Image
                  placeholder={'blur'}
                  blurDataURL={blurURI}
                  className={'my-9'}
                  src={transformImg(imageSrc, 450, 300)} height={300} width={450}
                  alt={'preview'}/>
              }
              {imageSrc && !uploadData && (
                <Button>
                  <Upload className="mr-2 h-4 w-4"/>Prześlij plik
                </Button>
              )}

              {uploadData && (
                <> <code>
                  <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                </code>
                  <Button onClick={() => clear()}>Przesłane!!! - wyczyść </Button></>
              )}
            </form>
          </section>
        </TabsContent>
        <TabsContent value="images">
          <div className={'flex-2'}>
            <Header className={'mb-8'} title={'Przesłane zdjęcia'} subtitle={'lista plików na serwerze'}/>
              <Gallery/>
          </div>
        </TabsContent>
      </Tabs>
    </main>

  )
}

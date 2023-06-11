import {Header} from "@/components/ui/Header";
import Gallery from "@/components/gallery";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import UploadThingUploader from "@/pages/media/(UploadThingUploader)";
import EasyUploader from "@/pages/media/(EasyUploader)";

export default function MediaPage(props) {


  return (
    <main>
      <Tabs defaultValue="images">
        <TabsList>
          <TabsTrigger value="upload">Prześlij zdjęcia (Cloudinary)</TabsTrigger>
          <TabsTrigger value="images">Przesłane zdjęcia (Cloudinary)</TabsTrigger>
          <TabsTrigger value="uploadthing">Pliki (Uploadthing)</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <EasyUploader/>
        </TabsContent>
        <TabsContent value="images">
          <div className={'flex-2'}>
            <Header className={'mb-8'} title={'Przesłane zdjęcia'} subtitle={'lista plików na serwerze'}/>
            <Gallery/>
          </div>
        </TabsContent>

        <TabsContent value="uploadthing">
          <div className={'flex-2'}>
            <Header className={'mb-8'} title={'Pliki Uploadthing.com'}
                    subtitle={'Przesyłaj i przeglądaj listę plików na serwerze Uploadthing.com'}/>
            <UploadThingUploader/>

          </div>
        </TabsContent>
      </Tabs>
    </main>

  )
}

import Image from "next/image";
import {transformImg} from "@/utils/transformImg";
import {Button} from "@/components/ui/button";
import {api} from "@/utils/api";
import {useEffect, useState} from "react";
import {AxiosCloudinary} from "@/utils/axios";
import {mapImages} from "@/lib/cloudinary";


const Gallery = (props) => {
  const [images, setImages] = useState([])
  const [nextCursor, setNextCursor] = useState('')


  // @ts-ignore
  const {data: media, isLoading} = api.media.getAllImages.useQuery({nextCursor: nextCursor})
  const handleLoadMore = async (event) => {
    if (!nextCursor) return
    event.preventDefault();
    const res = await AxiosCloudinary.post('/api/cloudinary/search', {next_cursor: nextCursor})
    const {resources, next_cursor: updatedNextCursor} = res.data
    const images = mapImages(resources)
    // @ts-ignore
    setImages(prev => [...prev, ...images])
    setNextCursor(updatedNextCursor)

  }

  useEffect(() => {
    if (media && images.length === 0) {
      setImages(media?.images)
      setNextCursor(media?.nextCursor)
    }
  }, [media])

  return (
    <section className={'grid grid-cols-4 gap-6'}>
      {images?.map((item, index) => {
          // @ts-ignore
          return (
            <div className={'flex justify-items-center rounded-xl align-middle transition hover:scale-150'}
                 key={index}>
              <div className={'cursor-pointer'}>
                {/*// @ts-ignore*/}

                <div onClick={() => props.setCurUrl(item.image)}>

                  <Image
                    placeholder={'blur'}

                    className={'rounded-xl'}
                    blurDataURL={'/noimage.jpg'}
                    // @ts-ignore
                    src={transformImg(item.image, 450, 300)}
                    alt={'picture'} width={450} height={300}/>
                </div>
                {/*// @ts-ignore*/}
                <p className={'text-sm break-all'}>{item.title}</p>
              </div>
            </div>
          )
        }
      )}
      <Button className={'my-10'} disabled={!nextCursor} onClick={handleLoadMore}>Załaduj więcej zdjęć</Button>

    </section>

  )
}

export default Gallery

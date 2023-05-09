import Image from "next/image";
import {transformImg} from "@/utils/transformImg";
import {Button} from "@/components/ui/button";
import {api} from "@/utils/api";
import {useEffect, useState} from "react";
import {AxiosCloudinary} from "@/utils/axios";
import {mapImages} from "@/lib/cloudinary";
import {LoadingPage} from "@/components/loading";
import {blurURI} from "@/config/blutURI";

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

  return (<div>  {isLoading && <LoadingPage size={30}/>}

    <section className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'}>

      {images?.map((item, index) => {
          // @ts-ignore
          return (

            <div className={'flex justify-items-center rounded-xl align-middle transition hover:scale-125'}
                 key={index}>
              <div className={props.setCurUrl && 'cursor-pointer'}>

                {/*// @ts-ignore*/}
                <div onClick={() => props.setCurUrl && props.setCurUrl(item.image)
                }>

                  <Image
                    placeholder={'blur'}
                    blurDataURL={blurURI}

                    className={'rounded-xl'}
                    // @ts-ignore
                    src={transformImg(item.image, 450, 300)}
                    alt={'picture'} width={450} height={300}/>
                </div>
                {/*// @ts-ignore*/}
                <p className={'break-all text-sm'}>{item.title}</p>
              </div>
            </div>
          )
        }
      )}
      <Button className={'my-10'} disabled={!nextCursor} onClick={handleLoadMore}>Załaduj więcej zdjęć</Button>

    </section>

  </div>)
}

export default Gallery

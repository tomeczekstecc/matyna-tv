import Image from "next/image";
import {transformImg} from "@/utils/transformImg";


const Gallery = (props) => {

  return (
    <section className={'grid grid-cols-4 gap-6'}>
      {props.data?.map((item, index) => {

          return (
            <div className={'flex justify-items-center rounded-xl align-middle transition hover:scale-150'}
                 key={index}>
              <div className={'cursor-pointer'}>
                <div onClick={() => props.setCurUrl(item.image)}>
                  <Image
                    className={'rounded-xl'}
                    src={transformImg(item.image, 450, 300)}
                    alt={'picture'} width={450} height={300}/>
                </div>
                <p className={'text-sm break-all'}>{item.title}</p>
              </div>
            </div>
          )
        }
      )}
    </section>

  )
}

export default Gallery

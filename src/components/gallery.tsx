import Image from "next/image";


const Gallery = (props) => {
  if(props?.data) console.log(props.data?.resources)
    return (
      <section className={'grid grid-cols-4 gap-4'} >

        {props.data?.resources?.map((item, index) => {
            return (
              <div className={'flex justify-items-center border-2 border-gray-500 p-1  align-middle transition hover:scale-110'} key={index}>
               <div className={'cursor-pointer'} >
                 <div onClick={()=>props.setCurUrl(item.secure_url)} ><Image src={item.secure_url} alt={'picture'} width={300} height={200}/>
                 </div>
              </div>
              </div>
            )
          }
        )}
      </section>

      )
}

export default Gallery

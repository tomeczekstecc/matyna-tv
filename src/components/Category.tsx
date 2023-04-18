import React from "react"

const Category = ({data}) => {
  return (
    <div
      style={{backgroundColor: data?.category?.color}}
      className={`w-fit rounded p-1 px-2 text-sm font-bold text-white`}
    >
      {data?.category?.name}
    </div>
  )
}

export default Category

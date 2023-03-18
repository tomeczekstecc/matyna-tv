import React from "react"

const Category = ({ data }) => {
  return (
    <div
      style={{ backgroundColor: data?.category?.color }}
      className={`w-fit rounded p-1`}
    >
      {data?.category?.name}
    </div>
  )
}

export default Category

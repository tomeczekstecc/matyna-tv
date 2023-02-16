"use client"
import React from "react"
export const  Header =  ({ title, subtitle }) => {
  return (
  <div>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
      ) : (
        ""
      )}
    </div>
  )
}



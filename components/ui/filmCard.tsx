import React from "react"
// import  formatDistance  from "date-fns/esm/formatDistance"
import PropTypes from "prop-types"

const FilmCard = ({ title, subtitle, createdAt, url }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <iframe
          className="h-56 w-full rounded-t-lg "
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {/*{formatDistance(new Date(createdAt), new Date(), {*/}
            {/*  // locale: pl,*/}
            {/*  addSuffix: true,*/}
            {/*})}{" "}*/}
          </p>
        </div>
      </div>
    </div>
  )
}

FilmCard.defaultProps = {
  createdAt: "2020-12-04",
  subtitle: "Subtittle",
  title: "Title",
}

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
}

export default FilmCard

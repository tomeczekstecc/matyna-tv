"use client"

import React from "react"

const Header = ({ title, subtitle }) => {
  return (
    <div>
      <h1>
        {title} wfwfw
      </h1>
      {subtitle ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      ) : (
        ""
      )}
    </div>
  )
}

Header.defaultProps = {
  title: "Title",
}

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
// }


export default Header

import React from "react"

// CSS Imports
import "./Header.css"

const Header = (props) => {
  return (
    <div className="Header">
      <h1>Frontend Dev CS</h1>
      <button onClick={props.onClick} type="submit">
        Go
      </button>
    </div>
  )
}

export default Header

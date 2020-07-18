import React from "react"

// CSS Imports
import "./Header.css"

const Header = (props) => {
  return (
    <div className="Header">
      <h1 className="Header-h1">Frontend Dev CS</h1>
      <button className="Header-button" onClick={props.onClick} type="submit">
        Go
      </button>
    </div>
  )
}

export default Header

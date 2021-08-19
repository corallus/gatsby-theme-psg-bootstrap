import React from "react"
import logo from "../../../img/logo.svg"

export default ({title}) => {
    return (
        <img src={logo} alt={title} className="img-fluid"/>
    )
}
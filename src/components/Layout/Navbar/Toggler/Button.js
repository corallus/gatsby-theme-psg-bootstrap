import React from 'react'
import {Dropdown} from "react-bootstrap";
import {navbarParams} from "../../../../params";

const Button = ({event, ...props}) => {
    return (
        <Dropdown.Toggle {...props} {...navbarParams.togglerProps}>
            {event.frontmatter.dateShort} <span className="d-none d-sm-inline">{event.frontmatter.name}</span>
        </Dropdown.Toggle>
    )
}

export default Button

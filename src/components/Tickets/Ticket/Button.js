import React from 'react'
import Button from "../../Button"
import {ticketParams} from "../../../params";

export default ({...props}) => {
    return (
        <Button {...props} {...ticketParams.button.props}>
            {ticketParams.button.text}
        </Button>
    )
}


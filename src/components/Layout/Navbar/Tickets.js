import React from 'react'
import Knop from '../../Button'
import {navbarParams} from "../../../params";

export default ({...props}) => {
    return (
        <Knop {...props} {...navbarParams.ticketButton.props}>
            {navbarParams.ticketButton.text}
        </Knop>
    )
}
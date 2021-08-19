import React from 'react'
import Button from '../../Button'
import {summaryParams} from "../../../params";

export default ({children, ...props}) => {
    return (
        <Button {...props} {...summaryParams.ticketButton.props}>
            {summaryParams.ticketButton.text}
        </Button>
    )
}


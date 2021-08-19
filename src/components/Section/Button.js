import React from 'react'
import Button from '../Button'
import {sectionParams} from "../../params";

export default ({children, ...props}) => {
    return (
        <Button {...props} {...sectionParams.buttonProps}>
            {children}
        </Button>
    )
}
import React from 'react'
import {Button} from "react-bootstrap";

export default ({children, ...props}) => {
    return (
        <Button {...props}>
            {children}
        </Button>
    )
}


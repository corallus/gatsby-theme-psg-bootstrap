import React from 'react';
import {Button} from "react-bootstrap";
import {switcherParams} from "../../../params";

export default ({event, ...props}) => {
    return (
        <Button
            {...props}
            {...switcherParams.buttonProps}
        >
            {event.frontmatter.dateShort} <span className="d-none d-sm-inline">{event.frontmatter.name}</span>
        </Button>
    )
}


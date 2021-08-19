import React, {useContext, useEffect, useState} from 'react'
import Context from '../../../Events/Context';
import {Dropdown} from 'react-bootstrap';
import './style.scss'

export default ({event}) => {
    const [isActive, setIsActive] = useState(false)
    const {state, dispatch} = useContext(Context)

    useEffect(() => {
        setIsActive(state.event.id === event.id);
    }, [state.event.id, event.id])

    return (
        <Dropdown.Item className={isActive && 'active'} onClick={() => dispatch({type: 'changeEvent', payload: event})}>
            {event.frontmatter.dateShort} {event.frontmatter.name}
        </Dropdown.Item>
    )
}

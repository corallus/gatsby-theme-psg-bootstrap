import React, {useContext} from 'react'
import Context from '../../../Events/Context';
import {Dropdown} from 'react-bootstrap';
import Button from './Button'
import Item from './Item'
import './style.scss'

export default () => {
    const {state} = useContext(Context)
    const {event, events} = state
    return (
        events.length > 1 &&
        <Dropdown className="event-selector">
            <Button event={event} id="dropdown-basic" className={"py-0"}/>
            <Dropdown.Menu>
                {events.map(({node: post}) => (
                    <Item event={post} key={post.id}/>
                ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
import React, {useState} from 'react'
import {Accordion} from 'react-bootstrap'

import useInfo from "gatsby-theme-psg/src/components/Info/hook";

import Topic from './Topic'
import './style.scss'

export default ({items}) => {
    const posts = useInfo(items)

    const [activeKey, setActiveKey] = useState(null)

    return (
        <Accordion>
            <div className="row text-left">
                <div className="col-md-6">
                    {posts.map((item, i) => (
                        i % 2 === 0 &&
                        <Topic handleClick={setActiveKey} item={item} eventKey={`${i}`} active={`${i}` === activeKey}
                               key={i}/>
                    ))}
                </div>
                <div className="col-md-6">
                    {posts.map((item, i) => (
                        i % 2 !== 0 &&
                        <Topic handleClick={setActiveKey} item={item} eventKey={`${i}`} active={`${i}` === activeKey}
                               key={i}/>
                    ))}
                </div>
            </div>
        </Accordion>
    )
}

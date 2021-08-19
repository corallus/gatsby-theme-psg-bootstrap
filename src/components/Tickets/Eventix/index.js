import React, {useContext, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import Context from "../../Events/Context";
import {ticketParams} from "../../../params";

const Tickets = () => {
    const {state} = useContext(Context)
    const {event} = state

    useEffect(() => {
        document.querySelectorAll('iframe').forEach(
            function(elem){
                elem.parentNode.removeChild(elem);
            });
    }, [event])

    if (!event.frontmatter.eventix) return <h3 className="text-center">{ticketParams.emptyText}</h3>

    return (
        <>
            <Helmet>
                <script src={`https://shop.eventix.io/build/integrate.js?event=${event.frontmatter.eventix}`}/>
            </Helmet>
            <div id="shop-frame"
                 data-url={`https://shop.eventix.io/${event.frontmatter.eventix}`}
                 style={{maxWidth: '600px', margin: '0 auto'}}
            />
        </>
    )
}

export default Tickets

import React, {useContext} from 'react'
import {Helmet} from 'react-helmet'
import Context from "../Events/Context";

const EventMeta = () => {
    const {state} = useContext(Context)
    const {event} = state

    let eventStatus
    switch(event.frontmatter.status) {
        case 'In verkoop':
            eventStatus = 'EventScheduled'
            break
        case 'Uitverkocht':
            eventStatus = 'EventScheduled'
            break
        case 'Afgelast':
            eventStatus = 'EventCancelled'
            break
        case 'Verplaatst':
            eventStatus = 'EventPostponed'
            break
        default:
            eventStatus = 'EventScheduled'
    }

    const data = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.frontmatter.title,
        "startDate": event.frontmatter.date,
        "endDate": event.frontmatter.date,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": `https://schema.org/${eventStatus}`,
        "location": {
            "@type": "Place",
            "name": event.frontmatter.location,
        },
        "organizer": {
            "@type": "Organization",
            "name": "PSG Concerts B.V.",
        }
    }

    return (
        <Helmet>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
        </Helmet>
    )
}

export default EventMeta
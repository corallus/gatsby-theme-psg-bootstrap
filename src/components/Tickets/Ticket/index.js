import React from 'react'
import {Card} from 'react-bootstrap'
import Content from '../../Content'
import Price from './Price'
import showdown from 'showdown'
import TicketButton from "./Button";
import {Link} from "gatsby";

const converter = new showdown.Converter()

const Ticket = ({ticket, early_bird}) => {
    return (
        <Card className={"h-100 ticket"}>
            <Card.Body className="d-flex flex-column">
                <header className={"ticket-header"}>
                    <h3>{ticket.title}</h3>
                </header>
                <Price ticket={ticket} earlyBird={early_bird}/>
                <div className="mb-auto">
                    <Content content={converter.makeHtml(ticket.body)}/>
                </div>
                {ticket.url ?
                    <TicketButton as={'a'} href={ticket.url} target={'_blank'}/>
                    :
                    <TicketButton as={Link} to={'/tickets'}/>
                }
            </Card.Body>
        </Card>
    )
}

export default Ticket

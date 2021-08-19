import React from 'react'
import {Badge, Col, Row} from 'react-bootstrap';

const Price = ({ticket, earlyBird}) => {
    const currentPrice = (earlyBird && ticket.price_early) ? ticket.price_early : ticket.price
    const priceSplit = (currentPrice ? (earlyBird ? ticket.price_early : ticket.price).toFixed(2).split('.') : null)
    return (
        <Row className={'price my-2 ' + (earlyBird ? 'early' : 'regular')}>
            {earlyBird &&
            <Col className="col-auto">
                <Badge variant={"danger"}>EARLY BIRD</Badge>
                <del>{ticket.price}</del>
            </Col>
            }
            {ticket.price &&
            <Col className={"current-price"}>
                €{priceSplit[0]} <span className={"decimals"}>{priceSplit[1]}</span>
            </Col>
            }
        </Row>
    )
}

export default Price


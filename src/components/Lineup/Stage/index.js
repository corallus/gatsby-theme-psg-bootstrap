import React from 'react'
import Act from './Act';
import {Col, Row} from 'react-bootstrap'
import {lineupParams} from "../../../params";

const Stage = ({highlighted = 2, numItems = null, acts}) => {
    return (
        <React.Fragment>
            {acts && acts.length
                ?
                <Row className={"acts"}>
                    {acts.slice(0, highlighted).map((act, index) => (
                        <Col {...lineupParams.highlightedColProps} key={index}>
                            <Act act={act}/>
                        </Col>
                    ))}
                    {acts.slice(highlighted, numItems ? numItems : acts.length).map((act, index) => (
                        <Col {...lineupParams.colProps} key={index}>
                            <Act act={act}/>
                        </Col>
                    ))}
                </Row>
                :
                <h3 className="text-center">{lineupParams.emptyText}</h3>
            }

        </React.Fragment>
    )
}

export default Stage


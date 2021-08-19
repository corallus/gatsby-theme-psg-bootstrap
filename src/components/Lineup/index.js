import React, {useContext, useState} from 'react'
import Context from '../Events/Context'
import {Button, Nav, Tab} from 'react-bootstrap'
import Stage from './Stage'
import './style.scss'
import {lineupParams} from "../../params";

const Lineup = ({highlighted = 2, numItems = null}) => {
    const {state} = useContext(Context)
    const {event} = state
    const {stages} = event.frontmatter
    const [key, setKey] = useState("0");

    return (
        <React.Fragment>
            {stages && stages.length > 1 ?
                <Tab.Container defaultActiveKey={key} id="stage-tabs" onSelect={k => setKey(k)}>
                    <Nav className="justify-content-center my-5" aria-label="Stages" size="sm">
                        {stages.map((stage, index) => (
                            <Button {...lineupParams.stage.buttonProps} as={Nav.Link} key={index} eventKey={index}
                                    active={index === key}>
                                {stage.name}
                            </Button>
                        ))
                        }
                    </Nav>
                    <Tab.Content>
                        {stages.map((stage, index) => (
                            <Tab.Pane key={index} eventKey={index}>
                                <Stage highlighted={highlighted} numItems={numItems} acts={stage.acts}/>
                            </Tab.Pane>
                        ))
                        }
                    </Tab.Content>
                </Tab.Container>
                :
                stages && stages.length > 0 ?
                    <Stage highlighted={highlighted} numItems={numItems} acts={stages[0].acts}/>
                    :
                    <h3 className="text-center">{lineupParams.emptyText}</h3>
            }
        </React.Fragment>
    )
}

export default Lineup


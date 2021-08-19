import React from 'react'
import Content from "../../Content";
import Button from "./Button";
import Context from '../Context'
import './style.scss'
import {Link} from "gatsby";
import {summaryParams} from "../../../params";
import EventContainer from "gatsby-theme-psg/src/components/Events/Switcher";

const Summary = () => {
    return (
        <Context.Consumer>
            {({state}) => (
                <>
                    {state.events.length > 1 &&
                    <div className="my-3">
                        <EventContainer/>
                    </div>
                    }
                    <div className="event">
                        <div className={"my-2 location"}>
                        <span {...summaryParams.locationProps}>
                            {state.event.frontmatter.location}
                        </span>
                        </div>
                        {state.events.length < 2 &&
                        <div className={"my-4 date"}>
                        <span {...summaryParams.dateProps}>
                        {state.event.frontmatter.dateLong}
                        </span>
                        </div>
                        }
                        <Content content={state.event.html} />
                        {state.event.frontmatter.status === 'In verkoop' ?
                            <Button as={Link} to={"/tickets"}/>
                            :
                            <span className="text-danger status h2">[{state.event.frontmatter.status}]</span>
                        }
                    </div>
                </>
            )}
        </Context.Consumer>
    )
}

export default Summary

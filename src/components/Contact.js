import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import HTMLContent from 'gatsby-theme-psg/src/components/Content'
import { ResponseForm } from "./Form";

export default () => {
    const data = useStaticQuery(graphql`
        query ContactQuery {
            markdownRemark(frontmatter: {templateKey: {eq: "contact"}}) {
                html
                frontmatter {
                    title
                }
            }
        }`
    )
    return (
        <React.Fragment>
            <h2>
                <span>Antwoord niet gevonden?</span>
            </h2>
            <HTMLContent content={data.markdownRemark.html}/>

            <div style={{maxWidth: '450px'}} className={'mx-auto'}>
                <ResponseForm />
            </div>
        </React.Fragment>
    )
}
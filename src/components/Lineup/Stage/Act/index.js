import React from 'react'
import Img from 'gatsby-image'
import {graphql} from 'gatsby'
import {Card} from 'react-bootstrap';
import {lineupParams} from "../../../../params";

const Act = ({act}) => {
    const artist = act.artist
    return (
        <Card {...lineupParams.artist.cardProps}>
            {act.announced && artist.frontmatter.image
                ?
                <Card.Img as={Img} fluid={artist.frontmatter.image.childImageSharp.fluid}
                          alt={artist.frontmatter.title}
                />
                :
                <div style={{width: '100%', paddingBottom: '80%'}}/>
            }
            <Card.ImgOverlay>
                <Card.Footer>
                    {act.announced
                        ?
                        artist.frontmatter.title
                        :
                        lineupParams.artist.emptyText
                    }
                </Card.Footer>
            </Card.ImgOverlay>
        </Card>
    )
}

export const query = graphql`
    fragment Artist on MarkdownRemark {
        id
        html
        frontmatter {
            title
            templateKey
            image {
                childImageSharp {
                    fluid(maxWidth: 800, maxHeight: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    }
`

export default Act

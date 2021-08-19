import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import {graphql} from 'gatsby'
import {Card} from 'react-bootstrap';
import {lineupParams} from "../../../../params";

const Act = ({act}) => {
    const artist = act.artist
    return (
        <Card {...lineupParams.artist.cardProps}>
            {act.announced && artist.frontmatter.image
                ?
                <Card.Img
                    as={GatsbyImage}
                    fluid={artist.frontmatter.image.childImageSharp.gatsbyImageData}
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
    );
}

export const query = graphql`fragment Artist on MarkdownRemark {
  id
  html
  frontmatter {
    title
    templateKey
    image {
      childImageSharp {
        gatsbyImageData(width: 800, height: 600, quality: 100, layout: CONSTRAINED)
      }
    }
  }
}
`

export default Act

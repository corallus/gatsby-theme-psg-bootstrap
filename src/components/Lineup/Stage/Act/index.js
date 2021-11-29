import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import {Card} from 'react-bootstrap';
import {lineupParams} from "../../../../params";

const Act = ({act}) => {
    const artist = act.artist

    const image = act.image?.childImageSharp.gatsbyImageData || act.artist.frontmatter.image.childImageSharp.gatsbyImageData

    return (
        <Card {...lineupParams.artist.cardProps}>
            {act.announced && artist.frontmatter.image
                ?
                <Card.Img
                    as={GatsbyImage}
                    image={image}
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

export default Act

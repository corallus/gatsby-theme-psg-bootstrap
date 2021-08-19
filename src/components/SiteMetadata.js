import {graphql, useStaticQuery} from 'gatsby'

const useSiteMetadata = () => {
    const {site} = useStaticQuery(
        graphql`
            query SITE_METADATA_QUERY {
                site {
                    siteMetadata {
                        domain
                        social {
                            facebook
                            instagram
                        }
                        scrollOffset
                        menuItems {
                            name
                            link
                            external
                        }
                    }
                }
            }
        `
    )
    return site.siteMetadata
}

export default useSiteMetadata

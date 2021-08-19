import React from 'react'
import {FaFacebook, FaInstagram} from 'react-icons/fa';
import {IconContext} from "react-icons"
import useSiteMetadata from './SiteMetadata';

const Social = () => {
    const {social} = useSiteMetadata()
    return (
        <React.Fragment>
            <IconContext.Provider value={{size: "42px"}}>
                {social.instagram &&
                <li className="nav-item">
                    <a className="nav-link social-link" title="instagram" target="_blank" href={social.instagram}
                       rel="noopener noreferrer">
                        <FaInstagram/>
                    </a>
                </li>
                }
                {social.facebook &&
                <li className="nav-item">
                    <a className="nav-link social-link" title="facebook" target="_blank" href={social.facebook}
                       rel="noopener noreferrer">
                        <FaFacebook/>
                    </a>
                </li>
                }
            </IconContext.Provider>
        </React.Fragment>
    )
}

export default Social
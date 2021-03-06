import React from 'react'

import useSiteMetadata from 'gatsby-theme-psg/src/components/SiteMetadata'
import privacyStatement from 'gatsby-theme-psg/src/assets/privacy-statement.pdf'
import algemeneVoorwaarden from 'gatsby-theme-psg/src/assets/algemenevoorwaarden.pdf'

import SocialMenu from '../../Social'
import {PrimaryMenu} from '../Navbar/index'
import Logo from './Logo'
import './style.scss'

const Footer = () => {
    const {title} = useSiteMetadata()
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <div className="footer-inner w-100 h-100 py-4">
                <div className="container text-center text-md-left">
                    <div className="row">
                        <div className="col-auto mx-auto mx-lg-0 pl-0">
                            <Logo title={title} />
                        </div>
                        <div className="col-12 col-lg-9 d-flex align-content-end px-4 flex-wrap">
                            <div className="navigation mb-2 w-100 d-md-flex justify-content-between">
                                <ul className="nav main-menu justify-content-center justify-content-md-start">
                                    <PrimaryMenu/>
                                </ul>
                                <ul className="nav social-menu justify-content-center justify-content-md-end">
                                    <SocialMenu/>
                                </ul>
                            </div>
                            <p className="text-xs mb-0">
                                <small>© Copyright {year}, All Rights Reserved. <a href={algemeneVoorwaarden}>General
                                    Conditions of {title}</a> apply to this event</small> | <small><a
                                href={privacyStatement}>Privacy statement</a></small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

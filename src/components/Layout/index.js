import React from 'react'
import {Helmet} from 'react-helmet'
import Footer from './Footer/index'
import Navbar from './Navbar/index'
import useSiteMetadata from '../SiteMetadata'
import CookieConsent from "react-cookie-consent"
import {globalHistory} from "@reach/router"
import './style.scss'
import '../../theme.scss'
import {EventProvider} from '../Events/Context'
import NewsFlash from "./NewsFlash";
import EventMeta from "./EventMeta";

const Layout = ({title: pageTitle = null, description, template = null, children}) => {
    const {title} = useSiteMetadata()
    const isHome = globalHistory.location.pathname === '/'

    return (
        <>
            <Helmet bodyAttributes={{
                class: (template ? template : '')
            }}>
                <html lang="nl"/>
                <title>{pageTitle}</title>
                <meta name="description" content={description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta property="og:title" content={title}/>
                <meta property="og:url" content="/"/>
            </Helmet>
            <EventProvider>
                <EventMeta />
                <Navbar isHome={isHome}/>
                <main className={(isHome ? 'is-home' : 'not-home') + ' wrapper'}>
                    {children}
                    <NewsFlash />
                </main>
                <Footer/>
            </EventProvider>
            <CookieConsent
                enableDeclineButton
                declineButtonText="Weigeren"
                declineButtonClasses="btn btn-sm btn-danger"
                buttonClasses="btn btn-sm btn-success"
                buttonStyle={{}}
                declineButtonStyle={{}}
                location="bottom"
                buttonText="Accepteren"
                style={{background: "#2B373B", textAlign: "right"}}
                expires={150}
            >
                <small>Wij gebruiken cookies volgens onze <a href="/cookie-policy.pdf">Cookie Policy</a></small>
            </CookieConsent>
        </>
    )
}

export default Layout

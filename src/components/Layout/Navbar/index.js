import React, {useContext, useEffect, useState} from "react"
import {Link} from "gatsby"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import useSiteMetadata from 'gatsby-theme-psg/src/components/SiteMetadata'
import Context from 'gatsby-theme-psg/src/components/Events/Context'

import SocialMenu from "../../Social"
import Logo from "./Logo";
import EventToggler from "./Toggler";
import TicketButton from './Tickets'

import './style.scss'

const Toggler = () => {
    return <>
      <span className="mr-2 d-inline-block align-middle bar">
        <span className="icon-bar top-bar"/>
        <span className="icon-bar middle-bar"/>
        <span className="icon-bar bottom-bar"/>
      </span>
        <span className="d-none d-md-inline">MENU</span>
    </>
}

const SecondaryMenu = () => {
    return (
        <Nav as="ul"
             className="justify-content-center justify-content-lg-end align-items-center flex-row secondary-menu">
            <SocialMenu/>
            <li className="nav-item">
        <span className="nav-link">
          <TicketButton as={Link} to="/tickets"/>
        </span>
            </li>
        </Nav>
    )
}

export const PrimaryMenu = () => {
    const {menuItems} = useSiteMetadata()
    const {state} = useContext(Context)
    const {event} = state
    return (
        <>
            {menuItems.map((item, i) => (
                <Nav.Item as={"li"} key={i}>
                    {item.external ?
                        <Nav.Link
                            as={"a"}
                            href={item.link}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {item.name}
                        </Nav.Link>
                        :
                        <Nav.Link
                            eventKey={`${i}`}
                            as={Link}
                            to={item.link}
                            activeClassName="active"
                        >
                            {item.name}
                        </Nav.Link>
                    }
                </Nav.Item>
            ))}
            {event.frontmatter.links && event.frontmatter.links.map((item, i) => (
                <Nav.Item as={"li"} key={i}>
                    <Nav.Link
                        href={item.url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {item.name}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </>
    )
}

const CollapseMenu = () => {
    return (
        <>
            <Nav as="ul" className="main-menu">
                <PrimaryMenu/>
            </Nav>
            <div className="d-block d-lg-none">
                <SecondaryMenu/>
            </div>
        </>
    )
}

export default ({isHome = false}) => {
    const {title, scrollOffset} = useSiteMetadata()

    const [scroll, setScroll] = useState(false);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(
        () => {
            const handleScroll = () => {
                setShowLogo(window.scrollY > scrollOffset);
                setScroll(window.scrollY > 0);
            }
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener('scroll', handleScroll)
        },
    );

    return (
        <Navbar
            variant={(scroll ? 'light' : 'dark')}
            fixed="top"
            expand={null}
            collapseOnSelect={false}
        >
            <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="d-none d-lg-inline-block mr-3">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-right text-lg-left">
                            <Toggler/>
                        </Navbar.Toggle>
                    </div>
                    <div className="d-inline">
                        <EventToggler/>
                    </div>
                </div>
                {!isHome || showLogo
                    ?
                    <Link to="/" className="navbar-brand">
                        <Logo title={title}/>
                    </Link>
                    : ''
                }
                <div className="text-right">
                    <div className="d-none d-lg-block secondary-menu-navbar">
                        <SecondaryMenu/>
                    </div>
                    <div className="d-block d-lg-none">
                        <Navbar.Toggle aria-controls="basic-navbar-nav"
                                       className="text-right text-lg-left align-middle">
                            <Toggler/>
                        </Navbar.Toggle>
                    </div>
                </div>
            </div>
            <Navbar.Collapse id="basic-navbar-nav">
                <CollapseMenu/>
            </Navbar.Collapse>
        </Navbar>
    )
}
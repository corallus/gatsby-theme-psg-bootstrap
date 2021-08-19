import React, {useEffect} from 'react'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import './style.scss'
import {graphql, useStaticQuery} from "gatsby";

const NewsFlash = (props) => {
    const [modalShow, setModalShow] = React.useState(false);

    const data = useStaticQuery(graphql`
        query PopupQuery {
            markdownRemark(frontmatter: {templateKey: {eq: "popup"}}) {
                html
                frontmatter {
                    title
                    active
                    datetime
                }
            }
        }`
    )

    const {datetime, active} = data.markdownRemark.frontmatter

    useEffect(() => {
        const last_seen = localStorage.getItem('last_seen');
        if ((!last_seen || last_seen < datetime) && active) {
            setModalShow(true)
            localStorage.setItem('last_seen', datetime);
        }
    }, [datetime, active]);


    return (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            title={data.markdownRemark.frontmatter.title}
            html={data.markdownRemark.html}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            scrollable
            className={"text-dark"}
        >
            <Modal.Header closeButton>
                <Modal.Title className={"text-dark"} id="contained-modal-title-vcenter">
                    {data.markdownRemark.frontmatter.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewsFlash
import React from 'react'
import {Carousel} from 'react-bootstrap'
import Lightbox from 'react-image-lightbox'
import Img from 'gatsby-image'
import 'react-image-lightbox/style.css'
import './style.scss'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {galleryParams} from "../../params";

class Index extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

        this.state = {
            page: 0,
            direction: null,
            imageIndex: 0,
            isOpen: false,
        };
    }

    handleOpen(key) {
        const {page: index} = this.state
        this.setState({imageIndex: key + (index * this.props.imagesPerPage), isOpen: true})
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            page: selectedIndex,
            direction: e.direction,
        });
    }

    render() {
        const {page, direction, imageIndex, isOpen} = this.state;
        const {images, imagesPerPage} = this.props;

        const pages = [];
        for (let i = 1; i <= Math.ceil(this.props.images.length / imagesPerPage); i++) {
            let indexOfLastImage = i * imagesPerPage;
            let indexOfFirstImage = indexOfLastImage - imagesPerPage;
            let page = this.props.images.slice(indexOfFirstImage, indexOfLastImage);
            pages.push(page);
        }
        return (
            <>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[imageIndex].image.childImageSharp.fluid.src}
                        nextSrc={images[(imageIndex + 1) % images.length].image.childImageSharp.fluid.src}
                        prevSrc={images[(imageIndex + images.length - 1) % images.length].image.childImageSharp.fluid.src}
                        onCloseRequest={() => this.setState({isOpen: false})}
                        onMovePrevRequest={() =>
                            this.setState({
                                imageIndex: (imageIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                imageIndex: (imageIndex + 1) % images.length,
                            })
                        }
                    />
                )}
                <Carousel
                    activeIndex={page}
                    dir={direction}
                    onSelect={this.handleSelect}
                    interval={null}
                >

                    {pages.map((page, i) => (
                        <Carousel.Item key={i}>
                            <Row>
                                {page.map((image, j) => (
                                    <Col {...galleryParams.colProps} key={j} onClick={() => this.handleOpen(j)}
                                         style={{padding: '15px'}}>
                                        <Img className="rounded" fluid={image.image.childImageSharp.fluid}
                                             alt={image.alt}/>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </>
        );
    }
}

export default Index

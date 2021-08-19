import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {MdPlayCircleOutline} from 'react-icons/md';

export const Video = (props) => {
    const [showText, setShowText] = useState(true);
    const video = React.createRef();

    function handleClick() {
        video.current.play();
        setShowText(false)
    }

    return (
        <div className="position-relative video">
            <video width="100%" controls ref={video} onClick={() => setShowText(false)}>
                <source src={props.src} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            {showText &&
            <div onClick={handleClick} className="position-absolute text-white" style={{
                zIndex: 1,
                top: '50%',
                left: '50%',
                fontWeight: 'bold',
                transform: 'translate(-50%, -50%)'
            }}>
                {props.children}
            </div>
            }
        </div>
    )
}

export class VideoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {modalShow: false};
    }

    render() {
        let modalClose = () => this.setState({modalShow: false});

        return (
            <React.Fragment>
                <Button
                    variant="dark"
                    size={this.props.size}
                    onClick={() => this.setState({modalShow: true})}
                    className="btn-transparent"
                    style={{backgroundColor: 'gba(0, 0, 0, 0.5)'}}
                >
                    <MdPlayCircleOutline/> Watch promo
                </Button>

                <Modal size="lg" show={this.state.modalShow} onHide={modalClose}
                       aria-labelledby="contained-modal-title-vcenter" centered>
                    <Video src={this.props.src}/>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Video;
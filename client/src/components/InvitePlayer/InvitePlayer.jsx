import React from 'react';
import PropTypes from 'prop-types';
import './InvitePlayer.scss';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { withRouter } from 'react-router-dom';

class InvitePlayer extends React.Component {
    static get propTypes() {
        return {
            location: PropTypes.any
        };
    }

    componentDidMount() {
        // Highlight the text box
        document.getElementById('url').select();
    }

    copyToClipboard() {
        document.getElementById('url').select();
        document.execCommand('copy');
    }

    render() {
        return (
            <div className='invitePlayer'>
                <Modal centered show={true}>
                    <Modal.Header>
                        <Modal.Title>Invite a friend!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <FormControl
                                id="url"
                                value={window.location}
                                readOnly
                            />
                            <InputGroup.Append id="copy-btn" onClick={this.copyToClipboard}>
                                <InputGroup.Text>Copy</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer id="modal-footer">
                        <p>The game will start once another player has joined.</p>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(InvitePlayer);

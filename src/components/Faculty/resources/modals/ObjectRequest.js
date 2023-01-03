import React from 'react'
import Modal from 'react-modal'

function ObjectRequest(props) {

    const { openObjectModal, setObjectModal } = props

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, .7)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
        },
    };


    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openObjectModal}
                onRequestClose={() => setObjectModal(false)}>
                <div className='center'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Object Request</h2>
                </div>
            </Modal>
        </div>
    )
}

export default ObjectRequest
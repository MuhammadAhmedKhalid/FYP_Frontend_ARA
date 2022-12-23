import React from 'react'
import Modal from 'react-modal'

function AddRoom(props) {
    const { openRoomModal, setOpenRoomModal } = props

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
                isOpen={openRoomModal}
                onRequestClose={() => setOpenRoomModal(false)}>
                <div className='center'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Room</h2>
                </div>

            </Modal>
        </div>
    )
}

export default AddRoom
import React from 'react'
import Modal from 'react-modal'

function UpdBatch({update, setUpdate, data}) {

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
                isOpen={update}
                onRequestClose={() => setUpdate(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Update Batch</h2>
                </div>
            </Modal>
        </div>
    )
}

export default UpdBatch
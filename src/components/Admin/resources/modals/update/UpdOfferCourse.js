import React from 'react'
import Modal from 'react-modal'

function UpdOfferCourse({update, setUpdate, data}) {

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

    const submitHandler = (e) => {
        e.preventDefault()
        setUpdate(false)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={update}
                onRequestClose={() => setUpdate(false)}>
                    <div className='center flexbox-container-y'>
                        <h2 style={{ color: "#115868", fontSize: 20 }}>Update Offered Course</h2>
                        <form onSubmit={submitHandler}>
                            <div className='center flexbox-container-y'>
                                <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Update</button>
                            </div>
                        </form>
                    </div>
            </Modal>
        </div>
    )
}

export default UpdOfferCourse
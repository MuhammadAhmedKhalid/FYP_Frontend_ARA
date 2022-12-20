import React from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';

function AdminQuestionnaire(props) {
    const { openQuestionnaireModal, setOpenQuestionnaireModal } = props
    const customStyles = {
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '50px',
            zIndex: 1000
        },
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
                style={customStyles}
                isOpen={openQuestionnaireModal}
                onRequestClose={() => setOpenQuestionnaireModal(false)}>
                <div
                    className='flexbox-container-y'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Questionnaire</h2>
                    <Link to='/admin-home'><button className='modal-btn'>Save</button></Link>
                </div>
            </Modal>
        </div>
    )
}

export default AdminQuestionnaire
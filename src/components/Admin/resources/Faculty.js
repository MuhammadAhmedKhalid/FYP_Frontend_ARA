import React, { useState } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddFaculty from './modals/AddFaculty'

function Faculty() {

    const [openFacultyModal, setOpenFacultyModal] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const openModal = () => {
        setOpenFacultyModal(true)
    }

    return (
        <div className="flexbox-container-y white-bg-y">
            <div>
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '25px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ADD FACULTY</button>
                </div>
                <div style={{ marginTop: '25px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>FACULTY LIST</h2>
                </div>
                <div>
                    <AddFaculty openFacultyModal={openFacultyModal} setOpenFacultyModal={setOpenFacultyModal} setRefresh={setRefresh} />
                </div>
            </div>
        </div>
    )
}

export default Faculty
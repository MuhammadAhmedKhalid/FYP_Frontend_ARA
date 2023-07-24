import React from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'

function AllocatedTeacher() {

    const openModal = () => {

    }

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ALLOCATE TEACHER</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>ALLOCATED TEACHERS</h2>
                </div>
            </div>
        </div>
    )

}

export default AllocatedTeacher
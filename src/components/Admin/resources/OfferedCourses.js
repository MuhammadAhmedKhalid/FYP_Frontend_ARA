import React from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'

function OfferedCourses() {

    const openModal = () => {

    }

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>OFFER COURSE</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>OFFERED COURSES</h2>
                </div>
            </div>
        </div>
    )
}

export default OfferedCourses
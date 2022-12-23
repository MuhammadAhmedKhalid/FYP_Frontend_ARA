import React, { useState } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddObject from './modals/AddObject'

function Objects() {
    const [openObjectModal, setOpenObjectModal] = useState(false)
    const openModal = () => {
        setOpenObjectModal(true)
    }
    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD OBJECT</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>OBJECTS LIST</h2>
                    </div>
                </div>
            </div>
            <div>
                <AddObject openObjectModal={openObjectModal} setOpenObjectModal={setOpenObjectModal} />
            </div>
        </div>
    )
}

export default Objects
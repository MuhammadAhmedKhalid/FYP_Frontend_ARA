import React, { useState } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddRoom from './modals/AddRoom'

function Rooms() {
    const [openRoomModal, setOpenRoomModal] = useState(false)
    const openModal = () => {
        setOpenRoomModal(true)
    }
    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD ROOM</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>ROOMS LIST</h2>
                    </div>
                </div>
            </div>
            <div>
                <AddRoom openRoomModal={openRoomModal} setOpenRoomModal={setOpenRoomModal} />
            </div>
        </div>
    )
}

export default Rooms
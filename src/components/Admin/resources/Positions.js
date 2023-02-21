import React, { useState } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddPosition from './modals/AddPosition'

function Positions() {

    const [openPositionModal, setOpenPositionModal] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const openModal = () => {
        setOpenPositionModal(true)
    }

  return (
    <div>
        <div className="flexbox-container-y white-bg-y">
            <div>
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ADD POSITION</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>POSITIONS</h2>
                </div>
            </div>
        </div>
        <div>
            <AddPosition openPositionModal={openPositionModal} setOpenPositionModal={setOpenPositionModal} setRefresh={setRefresh} />
        </div>
    </div>
  )
}

export default Positions
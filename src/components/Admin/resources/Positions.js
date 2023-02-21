import React, { useState } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddPosition from './modals/AddPosition'
import Table from '../../Root/Table'

function Positions() {

    const [openPositionModal, setOpenPositionModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])

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
                    <h2 style={{ color: '#0E5E6F' }}>POSITIONS LIST</h2>
                </div>
                <center>
                    {
                        <Table columns={['No.', 'Position']} rows={rowData}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddPosition openPositionModal={openPositionModal} setOpenPositionModal={setOpenPositionModal} setRefresh={setRefresh} />
        </div>
    </div>
  )
}

export default Positions
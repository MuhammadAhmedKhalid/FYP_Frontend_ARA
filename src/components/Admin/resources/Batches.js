import React, { useState } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddBatches from './modals/AddBatches'
import Table from '../../Root/Table'

function Batches() {
    const [openBatchModal, setOpenBatchModal] = useState(false)

    const openModal = () => {
        setOpenBatchModal(true)
    }

    const [rowData, setRowData] = useState([])

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD BATCH</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>BACTHES LIST</h2>
                    </div>
                    <center>
                        {
                            <Table columns={['No.', 'Batch Year', 'Department']} rows={rowData}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AddBatches openBatchModal={openBatchModal} setOpenBatchModal={setOpenBatchModal} />
            </div>
        </div>
    )
}

export default Batches
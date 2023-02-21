import React, { useState } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddSpecialization from './modals/AddSpecialization'
import Table from '../../Root/Table'

function Specialization() {

    const [openSpecializationModal, setOpenSpecializationModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])

    const openModal = () => {
        setOpenSpecializationModal(true)
    }

  return (
    <div>
        <div className="flexbox-container-y white-bg-y">
            <div>
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ADD SPECIALIZATION</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>SPECIALIZATIONS LIST</h2>
                </div>
                <center>
                    {
                        <Table columns={['No.', 'Specialization', 'Department']} rows={rowData}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddSpecialization openSpecializationModal={openSpecializationModal} setOpenSpecializationModal={setOpenSpecializationModal} setRefresh={setRefresh} />
        </div>
    </div>
  )
}

export default Specialization
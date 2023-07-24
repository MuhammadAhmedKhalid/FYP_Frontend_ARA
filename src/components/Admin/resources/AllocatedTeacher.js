import React, { useState } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import Table from '../../Root/Table'
import AllocateFaculty from './modals/AllocateFaculty'

function AllocatedTeacher() {

    const [openAllocateTeacherModal, setOpenAllocateTeacherModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()

    const openModal = () => {
        setOpenAllocateTeacherModal(true)
    }

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ALLOCATE FACULTY</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>ALLOCATED FACULTY</h2>
                </div>
                <center>
                    <Table 
                        columns={['No.', 'Faculty', 'Offered Course Details']} 
                        rows={rowData} 
                        setDeleteId={setDeleteId}
                        setUpdate={setUpdate}
                        setData={setData}/>
                </center>
            </div>
            <div>
                <AllocateFaculty 
                    openAllocateTeacherModal={openAllocateTeacherModal} setOpenAllocateTeacherModal={setOpenAllocateTeacherModal} 
                    setRefresh={setRefresh}/>
            </div>
        </div>
    )

}

export default AllocatedTeacher
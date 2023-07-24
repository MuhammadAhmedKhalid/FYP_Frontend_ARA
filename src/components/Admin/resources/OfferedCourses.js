import React, { useState } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import Table from '../../Root/Table'
import OfferCourse from './modals/OfferCourse'

function OfferedCourses() {

    const [openOfferCourseModal, setOpenOfferCourseModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()

    const openModal = () => {
        setOpenOfferCourseModal(true)
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
                <center>
                    <Table 
                        columns={['No.', 'Course', 'Batch', 'Department', 'Semester']} 
                        rows={rowData} 
                        setDeleteId={setDeleteId}
                        setUpdate={setUpdate}
                        setData={setData}/>
                </center>
            </div>
            <div>
                <OfferCourse 
                    openOfferCourseModal={openOfferCourseModal} setOpenOfferCourseModal={setOpenOfferCourseModal} 
                    setRefresh={setRefresh}/>
            </div>
        </div>
    )
}

export default OfferedCourses
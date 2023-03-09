import React, { useState } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import Table from '../../Root/Table'
import AssignCourse from './modals/AssignCourse'

function AssignedCourses() {

  const [openAssignCourseModal, setOpenAssignCourseModal] = useState(false)
  const [rowData, setRowData] = useState([])
  const [refresh, setRefresh] = useState(false)

  const openModal = () => {
    setOpenAssignCourseModal(true)
} 

  return (
    <div>
      <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ASSIGN COURSE</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>ASSIGNED COURSES</h2>
                    </div>
                    <center>
                        {
                            <Table columns={['No.', 'Course', 'Department', 'Faculty']} rows={rowData}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AssignCourse openAssignCourseModal={openAssignCourseModal} setOpenAssignCourseModal={setOpenAssignCourseModal} setRefresh={setRefresh}/>
            </div>
    </div>
  )
}

export default AssignedCourses
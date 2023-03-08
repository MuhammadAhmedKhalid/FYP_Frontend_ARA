import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddCourse from './modals/AddCourse'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../redux/GetCourse/getCourseActions'

function Courses() {

    const dispatch = useDispatch()

    const [openCourseModal, setOpenCourseModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    
    const [rowData, setRowData] = useState([])

    useEffect(()=>{
        if(coursessAdded && departmentsAdded && rowData.length !== courses.length){
            for(let i=0; i<courses.length; i++){
                for(let j=0; j<departments.length; j++){
                    if(departments[j].department_id === courses[i].department_id){
                        rowData.push([courses[i].course_name, departments[j].department_name])
                    }
                }
            }
        }
    }, [coursessAdded, departmentsAdded])

    useEffect(()=>{
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
        }
    }, [refresh, institute_id])

    const openModal = () => {
        setOpenCourseModal(true)
    }

  return (
    <div>
        <div className="flexbox-container-y white-bg-y">
            <div>
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ADD COURSE</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>COURSES LIST</h2>
                </div>
                <center>
                    {
                        coursessAdded && <Table columns={['No.', 'Courses', 'Department']} rows={rowData}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddCourse openCourseModal={openCourseModal} setOpenCourseModal={setOpenCourseModal} setRefresh={setRefresh} />
        </div>
    </div>
  )
}

export default Courses
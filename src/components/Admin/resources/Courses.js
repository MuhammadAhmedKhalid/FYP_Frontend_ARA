import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddCourse from './modals/AddCourse'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../redux/GetCourse/getCourseActions'
import { resetState } from '../../../redux/UpdateCourse/updateCourseActions'
import { deleteCourseRequest } from '../../../redux/DeleteCourse/deleteCourseActions'
import UpdCourse from './modals/update/UpdCourse'

function Courses() {

    const dispatch = useDispatch()

    const [openCourseModal, setOpenCourseModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()
    
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const institute_id = localStorage.getItem('institute_id')
    const updateError = useSelector((state) => state.updateCourseReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateCourseReducer.updated)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteCourseRequest(deleteId))
            alert('Deleted successfully.')
            setUpdate(false)
            setDeleteId(null)
        }
    }, [deleteId])

    useEffect(()=>{
        if(updateError.length > 0){
            alert(updateError)
            dispatch(resetState())
        }else if(updatedSuccessfully){
            alert('Updated successfully.')
            dispatch(resetState())
        }
    }, [updateError, updatedSuccessfully])
    
    useEffect(()=>{
        if(refresh){
            setRowData([])
        }
        if(coursessAdded && departmentsAdded && rowData.length === 0){
            if(refresh){
                setRowData([])
                setRefresh(false)
            }
            for(let i=0; i<courses.length; i++){
                for(let j=0; j<departments.length; j++){
                    if(departments[j].department_id === courses[i].department_id){
                        rowData.push([courses[i].course_id , courses[i].course_name, departments[j].department_name,
                            courses[i].course_code, courses[i].credit_hours, courses[i].type])
                    }
                }
            }
        }
    }, [courses, departments, refresh])

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
                        coursessAdded && 
                        <Table columns={['No.', 'Courses', 'Department', 'Course code', 'Credit hours', 'Type']} 
                            rows={rowData} setUpdate={setUpdate}setDeleteId={setDeleteId} setData={setData}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddCourse openCourseModal={openCourseModal} setOpenCourseModal={setOpenCourseModal} setRefresh={setRefresh}/>
        </div>
        {
            update && <UpdCourse update={update} setUpdate={setUpdate} data={data}/>
        }
    </div>
  )
}

export default Courses
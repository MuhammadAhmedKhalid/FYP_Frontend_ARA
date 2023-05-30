import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import Table from '../../Root/Table'
import AssignCourse from './modals/AssignCourse'
import { useSelector, useDispatch } from 'react-redux'
import { assignedCoursesForTableRequest } from '../../../redux/AssignedCoursesForTable/assignedCoursesForTableActions'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../redux/GetCourse/getCourseActions'
import { getFacultyRequest } from '../../../redux/GetFaculty/getFacultyActions'
import { getBatchesRequest } from '../../../redux/GetBatches/getBatchesActions'
import { deleteAssignedCoursesRequest } from '../../../redux/DeleteAssignedCourses/deleteAssignedCoursesActions'

function AssignedCourses() {

  const dispatch = useDispatch()

  const institute_id = localStorage.getItem('institute_id')
  const assignedCourses = useSelector((state) => state.assignedCoursesForTableReducer.assignedCourses.data)
  const assignedCoursesAdded = useSelector((state) => state.assignedCoursesForTableReducer.added)
  const faculty = useSelector((state) => state.getFaculty.faculty)
  const facultyAdded = useSelector((state) => state.getFaculty.added)
  const courses = useSelector((state) => state.getCourseReducer.courses)
  const coursessAdded = useSelector((state) => state.getCourseReducer.added)
  const departments = useSelector((state) => state.getDepartments.departments.data)
  const departmentsAdded = useSelector((state) => state.getDepartments.added)
  const batches = useSelector((state) => state.getBatchesReducer.batches.data)
  const batchesAdded = useSelector((state) => state.getBatchesReducer.added)

  const [openAssignCourseModal, setOpenAssignCourseModal] = useState(false)
  const [rowData, setRowData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteAssignedCoursesRequest(deleteId))
            setDeleteId(null)
        }
    }, [deleteId])

  useEffect(()=>{
    if(refresh){
      setRowData([])
    }
    if(assignedCoursesAdded && rowData.length !== assignedCourses.length
      && departmentsAdded && coursessAdded && facultyAdded && batchesAdded){
        if(refresh){
          setRowData([])
          setRefresh(false)
      }
        for(let i=0; i<assignedCourses.length; i++){
          for(let j=0; j<departments.length; j++){
            for(let k=0; k<courses.length; k++){
              for(let l=0; l<faculty.length; l++){
                for(let m=0; m<batches.length; m++){
                  if(assignedCourses[i].departmentId == departments[j].department_id && assignedCourses[i].courseId == courses[k].course_id
                    && assignedCourses[i].facultyId == faculty[l].faculty_id && assignedCourses[i].batchId == batches[m].batchId){
                      rowData.push([assignedCourses[i].assignedCoursesId , courses[k].course_name, departments[j].department_name, faculty[l].name,
                         batches[m].batchYear, assignedCourses[i].semesterType])
                    }
                }
              }
            }
          }
        }
    }
  },[assignedCourses, refresh, departments, courses, faculty, batches])

  useEffect(() => {
    if(institute_id > 0){
      dispatch(assignedCoursesForTableRequest(institute_id))
      dispatch(getDepartmentsRequest(institute_id))
      dispatch(getCourseRequest(institute_id))
      dispatch(getFacultyRequest(institute_id))
      dispatch(getBatchesRequest(institute_id))
    }
  }, [refresh, institute_id])
  

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
                            <Table columns={['No.', 'Course', 'Department', 'Faculty', 'Batch', 'Semester Type']} rows={rowData} 
                              refresh={refresh} setRefresh={setRefresh} uneditable={true} setDeleteId={setDeleteId}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AssignCourse openAssignCourseModal={openAssignCourseModal} setOpenAssignCourseModal={setOpenAssignCourseModal}
                  setRefresh={setRefresh}/>
            </div>
    </div>
  )
}

export default AssignedCourses
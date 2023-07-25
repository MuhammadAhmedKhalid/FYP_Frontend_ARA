import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import Table from '../../Root/Table'
import AllocateFaculty from './modals/AllocateFaculty'
import { useSelector, useDispatch } from 'react-redux'
import { getAllocatedFaculty } from '../../../redux/GetAllocatedFaculty/allocatedFacultyActions'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../redux/GetCourse/getCourseActions'
import { getBatchesRequest } from '../../../redux/GetBatches/getBatchesActions'
import { getFacultyRequest } from '../../../redux/GetFaculty/getFacultyActions'
import { getOfferedCourses } from '../../../redux/GetOfferedCourses/getOfferedCoursesActions'

function AllocatedTeacher() {

    const dispatch = useDispatch()

    const allocatedFaculty = useSelector((state) => state.allocatedFacultyReducer.allocatedFaculty.data)
    const allocatedFacultyAdded = useSelector((state) => state.allocatedFacultyReducer.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const facultyList = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const offeredCourses = useSelector((state) => state.offeredCoursesReducer.offeredCourses.data)
    const offeredCoursesAdded = useSelector((state) => state.offeredCoursesReducer.added)

    const institute_id = localStorage.getItem('institute_id')

    const [openAllocateTeacherModal, setOpenAllocateTeacherModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getAllocatedFaculty(institute_id))
            dispatch(getCourseRequest(institute_id))
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(getOfferedCourses(institute_id))
        }
    }, [refresh, institute_id])

    useEffect(() => {
        if(refresh){
            setRowData([])
        }
        if(allocatedFacultyAdded && facultyAdded && offeredCoursesAdded && coursessAdded && rowData.length === 0){
            if(refresh){
                setRowData([])
                setRefresh(false)
            }
            for(let i of allocatedFaculty){
                for(let j of offeredCourses){
                    for(let k of facultyList){
                        for(let l of courses){
                            for(let m of departments){
                                for(let n of batches){
                                    if(i.faculty_id === k.faculty_id && i.offerCourseId === j.offerCourseId
                                        && l.course_id === j.course_id && m.department_id === j.department_id
                                        && n.batchId === j.batchId){
                                            rowData.push([i.allocateFacultyId, k.name, l.course_name+" ("+l.type+") ", l.credit_hours, 
                                            m.department_name, n.batchCode+"-"+n.section, j.semester])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [allocatedFaculty, allocatedFacultyAdded, refresh])

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
                    {
                        allocatedFacultyAdded &&
                        <Table 
                            columns={['No.', 'Faculty', 'Offered Course', 'Credit Hours', 'Department', 'Batch', 'Semester']} 
                            rows={rowData} 
                            setDeleteId={setDeleteId}
                            setUpdate={setUpdate}
                            setData={setData}/>
                    }
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
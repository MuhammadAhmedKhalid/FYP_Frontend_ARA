import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import Table from '../../Root/Table'
import OfferCourse from './modals/OfferCourse'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseRequest } from '../../../redux/GetCourse/getCourseActions'
import { getBatchesRequest } from '../../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getOfferedCourses } from '../../../redux/GetOfferedCourses/getOfferedCoursesActions'
import { deleteOfferedCourseRequest } from '../../../redux/DeleteOfferedCourse/deleteOfferedCourseActions'
import UpdOfferCourse from './modals/update/UpdOfferCourse'
import { resetState } from '../../../redux/UpdateOfferedCourse/updateOfferedCourseActions'
import { resetDeleteState } from '../../../redux/DeleteOfferedCourse/deleteOfferedCourseActions'

function OfferedCourses() {

    const dispatch = useDispatch()

    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const offeredCourses = useSelector((state) => state.offeredCoursesReducer.offeredCourses.data)
    const offeredCoursesAdded = useSelector((state) => state.offeredCoursesReducer.added)
    const updateError = useSelector((state) => state.updateOfferedCourseReducer.error)
    const updateSuccessMsg = useSelector((state) => state.updateOfferedCourseReducer.result)
    const updated = useSelector((state) => state.updateOfferedCourseReducer.updated)
    const deleted = useSelector((state) => state.deleteOfferedCourseReducer.deleted)
    const dltSuccessMsg = useSelector((state) => state.deleteOfferedCourseReducer.success.data)
    const dltErrorMsg = useSelector((state) => state.deleteOfferedCourseReducer.error.data)

    const institute_id = localStorage.getItem('institute_id')

    const [openOfferCourseModal, setOpenOfferCourseModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getCourseRequest(institute_id))
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getOfferedCourses(institute_id))
        }
    }, [refresh, institute_id])

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteOfferedCourseRequest(deleteId))
        }
    }, [deleteId])

    useEffect(() => {
        if(deleted === true){
            alert(dltSuccessMsg)
            setUpdate(false)
            setDeleteId(null)
            dispatch(resetDeleteState())
        } else if (deleted === false){
            alert(dltErrorMsg)
            dispatch(resetDeleteState())
        }
    }, [deleted])

    useEffect(()=>{
        if (updated === true) {
            alert(updateSuccessMsg)
            dispatch(resetState())
        } else if (updated === false) {
            alert(updateError)
            dispatch(resetState())
        }
    }, [updated])

    useEffect(() => {
        if(refresh){
            setRowData([])
        }
        if(offeredCoursesAdded  && departmentsAdded && batchesAdded && coursessAdded && rowData.length === 0){
            if(refresh){
                setRowData([])
                setRefresh(false)
            }
            for(let i=0; i<offeredCourses.length; i++){
                for(let j=0; j<departments.length; j++){
                    for(let k=0; k<batches.length; k++){
                        for(let l=0; l<courses.length; l++){
                            if(offeredCourses[i].department_id === departments[j].department_id 
                                && offeredCourses[i].batchId === batches[k].batchId
                                && offeredCourses[i].course_id === courses[l].course_id){
                                    rowData.push([offeredCourses[i].offerCourseId, courses[l].course_name+" ("+courses[l].type+") ", 
                                        batches[k].batchCode+ "-"+batches[k].section,
                                        departments[j].department_name, offeredCourses[i].semester])
                                }
                        }
                    }
                }
            }
        }
    }, [offeredCoursesAdded, offeredCourses, refresh, departmentsAdded, batchesAdded, coursessAdded])

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
                    {
                        offeredCoursesAdded &&
                        <Table 
                            columns={['No.', 'Course', 'Batch', 'Department', 'Semester']} 
                            rows={rowData} 
                            setDeleteId={setDeleteId}
                            setUpdate={setUpdate}
                            setData={setData}/>
                    }
                </center>
            </div>
            <div>
                <OfferCourse 
                    openOfferCourseModal={openOfferCourseModal} setOpenOfferCourseModal={setOpenOfferCourseModal} 
                    setRefresh={setRefresh}/>
            </div>
            {
                update && <UpdOfferCourse update={update} setUpdate={setUpdate} data={data}/>
            }
        </div>
    )
}

export default OfferedCourses
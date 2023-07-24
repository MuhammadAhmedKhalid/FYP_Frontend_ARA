import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import Table from '../../Root/Table'
import OfferCourse from './modals/OfferCourse'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseRequest } from '../../../redux/GetCourse/getCourseActions'
import { getBatchesRequest } from '../../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'

function OfferedCourses() {

    const dispatch = useDispatch()

    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

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
        }
    }, [refresh, institute_id])

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
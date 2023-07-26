import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../../redux/GetCourse/getCourseActions'
import { getBatchesRequest } from '../../../../redux/GetBatches/getBatchesActions'
import { addOfferCourse, resetState } from '../../../../redux/AddOfferCourse/addOfferCourseActions'
import { Alert } from '@mui/material';
 
function OfferCourse(props) {

    const {openOfferCourseModal, setOpenOfferCourseModal, setRefresh} = props

    const dispatch = useDispatch()

    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const requestSuccessfull = useSelector((state) => state.addOfferCourseReducer.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addOfferCourseReducer.error)

    const institute_id = localStorage.getItem('institute_id')

    const [batchesData, setBatchesData] = useState([])
    const [coursesData, setCoursesData] = useState([])
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const [offerCourse, setOfferCourse] = useState({
        course_id: "",
        batchId: "",
        department_id: "",
        semester: "",
        institute_id
    })

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getCourseRequest(institute_id))
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [institute_id])

    useEffect(() => {
        if(batchesAdded && departmentsAdded && coursessAdded && offerCourse.department_id > 0){
            setBatchesData([])
            setCoursesData([])
            for(let i in batches){
                for(let j in departments){
                    if(batches[i].department_id === departments[j].department_id && departments[j].department_id == offerCourse.department_id){
                        setBatchesData(batchesData => [...batchesData, {batchId: batches[i].batchId, 
                            name: `${batches[i].batchCode} - ${batches[i].section}`, 
                          department_id: departments[j].department_id}])
                    }
                }
            }
            for(let i in courses){
                if(offerCourse.department_id == courses[i].department_id){
                    setCoursesData(coursesData => [...coursesData, {id: courses[i].course_id, 
                        name: `${courses[i].course_name} (${courses[i].type})`}])
                }
            }
        }
    }, [offerCourse.department_id])

    useEffect(() => {
        if(requestSuccessfull){
            setRefresh(true)
            setOpenOfferCourseModal(false)
            setErrorMsg('')
            setShowError(false)
            alert("Operation performed successfully!")
            dispatch(resetState())
        } else if (requestSuccessfull === false) {
            setErrorMsg(requestUnsuccessfullMsg)
            setShowError(true)
            dispatch(resetState())
        }
    }, [requestSuccessfull])

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, .7)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
        },
    };

    const closeModal = () => {
        setOpenOfferCourseModal(false)
        setShowError(false)
        setErrorMsg('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addOfferCourse(offerCourse))
    }

    const handleDepartmentChange = (event) => {
        const department_name = event.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setOfferCourse({ ...offerCourse, department_id: departments[i].department_id })
            }
        }
    }

    const handleBatchChange = (e) => {
        for(let i of batchesData){
            if(i.name === e.target.value){
                setOfferCourse({ ...offerCourse, batchId: i.batchId })
            }
        }
    }

    const handleCourseChange = (e) => {
        for(let i of coursesData){
            if(i.name === e.target.value){
                setOfferCourse({ ...offerCourse, course_id: i.id })
            }
        }
    }

    const handleSemesterChange = (e) => {
        setOfferCourse({ ...offerCourse, semester: e.target.value })
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openOfferCourseModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Offer Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ margin: '3px' }} className='flexbox-container-y'>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Department</h3>
                            <select required className='dropdown' onChange={handleDepartmentChange}>
                                <option></option>
                                {
                                    departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                        <option key={department.department_id}>{department.department_name}</option>) : null
                                }
                            </select>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Batch</h3>
                            <select required className='dropdown' onChange={handleBatchChange}>
                            <option></option>
                                {
                                    batchesData.length !== 0 ? batchesData.map(batch => 
                                        <option key={batch.batchId}>{batch.name}</option>) : null
                                }
                            </select>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Course</h3>
                            <select required className='dropdown' onChange={handleCourseChange}>
                            <option></option>
                                {
                                    coursesData.length !== 0 ? coursesData.map(course => 
                                        <option key={course.id}>{course.name}</option>) : null
                                }
                            </select>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Semester</h3>
                            <select required className='dropdown' onChange={handleSemesterChange}>
                                <option></option>
                                <option>1 (Fall)</option>
                                <option>2 (Spring)</option>
                                <option>3 (Fall)</option>
                                <option>4 (Spring)</option>
                                <option>5 (Fall)</option>
                                <option>6 (Spring)</option>
                                <option>7 (Fall)</option>
                                <option>8 (Spring)</option>
                            </select>
                        </div>
                        <div>
                            {
                                showError && <Alert style={{ marginTop: '12px' }} severity="error">{errorMsg}</Alert>
                            }
                        </div>
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Add</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default OfferCourse
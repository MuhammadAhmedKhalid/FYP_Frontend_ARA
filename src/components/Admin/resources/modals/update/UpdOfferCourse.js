import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../../../redux/GetCourse/getCourseActions'
import { getBatchesRequest } from '../../../../../redux/GetBatches/getBatchesActions'
import { getOfferedCourses } from '../../../../../redux/GetOfferedCourses/getOfferedCoursesActions'
import { updateOfferedCourse } from '../../../../../redux/UpdateOfferedCourse/updateOfferedCourseActions'

function UpdOfferCourse({update, setUpdate, data}) {

    const dispatch = useDispatch()

    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const offeredCourses = useSelector((state) => state.offeredCoursesReducer.offeredCourses.data)

    const institute_id = localStorage.getItem('institute_id')

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

    const [offerCourse, setOfferCourse] = useState({
        course_id: "",
        batchId: "",
        department_id: "",
        semester: "",
        institute_id
    })

    const [batchesData, setBatchesData] = useState([])
    const [coursesData, setCoursesData] = useState([])

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
        if(institute_id > 0){
            dispatch(getCourseRequest(institute_id))
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getOfferedCourses(institute_id))
        }
    }, [institute_id])

    const submitHandler = (e) => {
        e.preventDefault()

        for(let i of offeredCourses){
            if(i.offerCourseId === data[0]){
                dispatch(updateOfferedCourse(i.offerCourseId, offerCourse))
                break
            }
        }

        setUpdate(false)
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
                isOpen={update}
                onRequestClose={() => setUpdate(false)}>
                    <div className='center flexbox-container-y'>
                        <h2 style={{ color: "#115868", fontSize: 20 }}>Update Offered Course</h2>
                        <form onSubmit={submitHandler}>
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
                            <div className='center flexbox-container-y'>
                                <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Update</button>
                            </div>
                        </form>
                    </div>
            </Modal>
        </div>
    )
}

export default UpdOfferCourse
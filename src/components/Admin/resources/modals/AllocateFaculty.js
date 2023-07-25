import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../../redux/GetCourse/getCourseActions'
import { getBatchesRequest } from '../../../../redux/GetBatches/getBatchesActions'
import { getFacultyRequest } from '../../../../redux/GetFaculty/getFacultyActions'
import { getOfferedCourses } from '../../../../redux/GetOfferedCourses/getOfferedCoursesActions'
import { allocateFaculty } from '../../../../redux/AddAllocateFaculty/allocateFacultyActions'

function AllocateFaculty(props) {

    const {openAllocateTeacherModal, setOpenAllocateTeacherModal, setRefresh} = props

    const dispatch = useDispatch()

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

    const [batchesData, setBatchesData] = useState([])
    const [facultyData, setFacultyData] = useState([])
    const [offeredCourseData, setOfferedCourseData] = useState([])
    const [semester, setSemester] = useState()
    const [submit, setSubmitted] = useState(false)
    const [batchId, setBatchId] = useState()
    const [department_id, setDepartmentId] = useState()

    const [allocate, setAllocate] = useState({
        offerCourseId: "",
        faculty_id: "",
        institute_id
    })

    useEffect(() => {
        if(institute_id > 0){
            if(submit){
                setSubmitted(false)
            }
            dispatch(getCourseRequest(institute_id))
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(getOfferedCourses(institute_id))
        }
    }, [institute_id, submit])

    useEffect(() => {
        if(batchesAdded && departmentsAdded && coursessAdded && facultyAdded && department_id > 0){
            setBatchesData([])
            setFacultyData([])
            for(let i in batches){
                for(let j in departments){
                    if(batches[i].department_id === departments[j].department_id && departments[j].department_id == department_id){
                        setBatchesData(batchesData => [...batchesData, {batchId: batches[i].batchId, 
                            name: `${batches[i].batchCode} - ${batches[i].section}`, 
                          department_id: departments[j].department_id}])
                    }
                }
            }
            for(let i in facultyList){
                if(department_id == facultyList[i].department_id){
                    setFacultyData(facultyData => [...facultyData, {id: facultyList[i].faculty_id, name: facultyList[i].name}])
                }
            }
        }
    }, [department_id])

    useEffect(() => {
        if(semester > 0 && offeredCoursesAdded){
            setOfferedCourseData([])
            for(let i of offeredCourses){
                if(i.department_id == department_id && i.semester == semester && i.batchId == batchId
                    && i.allocated === false){
                    for(let j of courses){
                        if(j.course_id === i.course_id){
                            setOfferedCourseData(offeredCourseData => [...offeredCourseData, {
                                id: i.offerCourseId, name: `${j.course_name} (${j.type})`
                            }])
                        }
                    }
                }
            }
        }
    }, [semester, department_id, batchId])

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
        setOpenAllocateTeacherModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(allocateFaculty(allocate))
        setOpenAllocateTeacherModal(false)
        alert("Operation performed successfully!")
        setSubmitted(true)
        setRefresh(true)
    }

    const handleDepartmentChange = (event) => {
        const department_name = event.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setDepartmentId(departments[i].department_id)
            }
        }
    }

    const handleBatchChange = (e) => {
        for(let i of batchesData){
            if(i.name === e.target.value){
                setBatchId(i.batchId)
            }
        }
    }

    const handleFacultyChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedId = selectedOption.getAttribute('data-key');
        setAllocate({...allocate, faculty_id: selectedId})
    }

    const handleOfferedCourseChange = (e) => {
        for(let i of offeredCourseData){
            if(i.name === e.target.value){
                setAllocate({...allocate, offerCourseId: i.id})
            }
        }
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openAllocateTeacherModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Allocate Faculty</h2>
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
                            }}>Faculty</h3>
                            <select required className='dropdown' onChange={handleFacultyChange}>
                            <option></option>
                                {
                                    facultyData.length !== 0 ? facultyData.map(faculty => 
                                        <option key={faculty.id} data-key={faculty.id}>{faculty.name}</option>) : null
                                }
                            </select>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Semester</h3>
                            <select required className='dropdown' onChange={(e) => setSemester(e.target.value)}>
                                <option></option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                            </select>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Offered Courses</h3>
                            <select required className='dropdown' onChange={handleOfferedCourseChange}>
                            <option></option>
                                {
                                    offeredCourseData.length !== 0 ? offeredCourseData.map(offeredCourse => 
                                        <option key={offeredCourse.id}>{offeredCourse.name}</option>) : null
                                }
                            </select>
                        </div>
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Allocate</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AllocateFaculty
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getBatchesRequest } from '../../../../redux/GetBatches/getBatchesActions'
import { getAllocatedFaculty } from '../../../../redux/GetAllocatedFaculty/allocatedFacultyActions'
import { getOfferedCourses } from '../../../../redux/GetOfferedCourses/getOfferedCoursesActions'
import { getStaffRequest } from '../../../../redux/GetStaffRequest/getStaffReqActions'
import { getRoomRequest } from '../../../../redux/GetRoomRequests/getRoomReqActions'
import { assignedCoursesRequest } from '../../../../redux/AssignedCourses/assignedCoursesActions'

function GenerateTimetable({generateTimetableModal, setGenerateTimetableModal}) {

    const dispatch = useDispatch()

    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const allocatedFaculty = useSelector((state) => state.allocatedFacultyReducer.allocatedFaculty.data)
    const offeredCourses = useSelector((state) => state.offeredCoursesReducer.offeredCourses.data)
    const requestedStaff = useSelector((state) => state.staffReqReducer.staff_req.data)
    const requestedRooms = useSelector((state) => state.getRoomRequest.room_req.data)
    const assignedCourses = useSelector((state) => state.assignedCoursesReducer.assignedCourses.data)

    const institute_id = localStorage.getItem('institute_id')
    const instituteStartTime = localStorage.getItem('instituteStartTime')
    const instituteEndTime = localStorage.getItem('instituteEndTime')

    const [batchesData, setBatchesData] = useState([])
    const [department_id, setDepartmentId] = useState()
    const [batchId, setBatchId] = useState()
    const [semester, setSemester] = useState("")

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getAllocatedFaculty(institute_id))
            dispatch(getOfferedCourses(institute_id))
            dispatch(getStaffRequest(institute_id))
            dispatch(getRoomRequest(institute_id))
            dispatch(assignedCoursesRequest(institute_id))
        }
    }, [institute_id])

    useEffect(() => {
        if(batchesAdded && departmentsAdded && department_id > 0){
            setBatchesData([])
            for(let i in batches){
                for(let j in departments){
                    if(batches[i].department_id === departments[j].department_id && departments[j].department_id == department_id){
                        setBatchesData(batchesData => [...batchesData, {batchId: batches[i].batchId, 
                            name: `${batches[i].batchCode} - ${batches[i].section}`, 
                          department_id: departments[j].department_id}])
                    }
                }
            }
        }
    }, [department_id])

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

    const submitHandler = (event) => {
        event.preventDefault()
        // console.log(department_id)
        // console.log(batchId)
        // console.log(semester)
        console.log(instituteStartTime+"-"+instituteEndTime)
        for(let i of allocatedFaculty){
            for(let j of offeredCourses){
                if(i.offerCourseId === j.offerCourseId && j.addedInTimetable === false && j.allocated === true
                    && j.department_id == department_id && j.batchId == batchId && j.semester == semester){
                        console.log(j)
                        console.log(i.faculty_id)
                        console.log(requestedRooms)
                        console.log(requestedStaff)
                        console.log(assignedCourses)

                        // get requested staff list and extract selected faculty (use faculty_id)
                        // get requested rooms list of selected department (use room_id and department_id)
                        // get assigned courses list to that department-batch (use batch_id and department_id) to check free time of that batch

                }
            }
        }
        // setGenerateTimetableModal(false)
    }

    const handleDepartmentChange = (event) => {
        const department_name = event.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setDepartmentId(departments[i].department_id)
                break
            }
        }
    }

    const handleBatchChange = (e) => {
        for(let i of batchesData){
            if(i.name === e.target.value){
                setBatchId(i.batchId)
                break
            }
        }
    }

    const handleSemesterChange = (e) => {
        setSemester(e.target.value)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={generateTimetableModal}
                onRequestClose={() => setGenerateTimetableModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Generate Timetable</h2>
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
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Generate</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default GenerateTimetable
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getBatchesRequest } from '../../../../redux/GetBatches/getBatchesActions'
import { getAllocatedFaculty } from '../../../../redux/GetAllocatedFaculty/allocatedFacultyActions'
import { getOfferedCourses } from '../../../../redux/GetOfferedCourses/getOfferedCoursesActions'
import { getStaffRequest } from '../../../../redux/GetStaffRequest/getStaffReqActions'
import { getRoomRequest } from '../../../../redux/GetRoomRequests/getRoomReqActions'
import { getRoomsRequest } from '../../../../redux/GetRooms/getRoomsActions'
import { assignedCoursesRequest } from '../../../../redux/AssignedCourses/assignedCoursesActions'
import { getCourseRequest } from '../../../../redux/GetCourse/getCourseActions'
import { checkConflict } from '../../utils'
import { format } from 'date-fns';
import { assignCourseRequest } from '../../../../redux/AssignCourse/assignCourseActions'

function GenerateTimetable({generateTimetableModal, setGenerateTimetableModal}) {

    const dispatch = useDispatch()

    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const allocatedFaculty = useSelector((state) => state.allocatedFacultyReducer.allocatedFaculty.data)
    const offeredCourses = useSelector((state) => state.offeredCoursesReducer.offeredCourses.data)
    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    
    const requestedStaff = useSelector((state) => state.staffReqReducer.staff_req.data)
    const requestedRooms = useSelector((state) => state.getRoomRequest.room_req.data)
    const assignedCourses = useSelector((state) => state.assignedCoursesReducer.assignedCourses.data)

    let tempRequestedStaff = requestedStaff
    let tempRequestedRooms = requestedRooms
    let tempAssignedCourses = assignedCourses


    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const institute_id = localStorage.getItem('institute_id')
    const instituteStartTime = localStorage.getItem('instituteStartTime')
    const instituteEndTime = localStorage.getItem('instituteEndTime')
    const springStart = localStorage.getItem('springStartMonth')
    const springEnd = localStorage.getItem('springEndMonth')
    const fallStart = localStorage.getItem('fallStartMonth')
    const fallEnd = localStorage.getItem('fallEndMonth')
    const user_id = Number(localStorage.getItem('user_id'))

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
            dispatch(getRoomsRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
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

    function divideTimeIntoHours(startTime, endTime) {
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);
        const timeIntervals = [];
      
        for (let hour = startHour; hour < endHour; hour++) {
          const start = `${String(hour).padStart(2, '0')}:00`;
          const end = `${String(hour + 1).padStart(2, '0')}:00`;
          timeIntervals.push([start, end]);
        }
      
        return timeIntervals;
    }

    function extractValuesInsideParentheses(inputString) {
        const regex = /\((.*?)\)/; 
        const match = inputString.match(regex);
        if (match && match[1]) {
          return match[1].trim();
        } else {
          return null; 
        }
    }
      
    function getDatesBetweenMonths(startMonth, endMonth) {
        const startDate = new Date(startMonth + " 1, " + new Date().getFullYear());
        const endDate = new Date(endMonth + " 1, " + new Date().getFullYear());
      
        endDate.setMonth(endDate.getMonth() + 1);
      
        const result = [];
      
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek >= 1 && dayOfWeek <= 6) {
            result.push(new Date(currentDate));
          }
      
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return result;
      }
      

    const submitHandler = (event) => {
        event.preventDefault()
        
        const dictionary = {};
        
        for(let i of allocatedFaculty){
            for(let j of offeredCourses){
                if(i.offerCourseId === j.offerCourseId && j.addedInTimetable === false && j.allocated === true
                    && j.department_id == department_id && j.batchId == batchId && j.semester == semester){

                        let courseId = j.course_id
                        dictionary[courseId] = 0;  
                }
            }
        }

        const instituteHours = divideTimeIntoHours(instituteStartTime, instituteEndTime);
        const extractSemesterType = extractValuesInsideParentheses(semester);

        function extractNonZeroValue(str) {
            const match = str.match(/[1-9]+/);
            return match ? Number(match[0]) : 0;
          }

        const isCrHrsIncompleteForTheWeek = (offeredCourse) => {
            
            for (const key in dictionary) {
                const unassignedCrHrs = dictionary[key]
                for(let i of courses){
                    if(i.course_id === offeredCourse.course_id && i.course_id == key){
                        const reqCrHrs = extractNonZeroValue(i.credit_hours);
                        return reqCrHrs>unassignedCrHrs
                    }
                }
            }

        }

        const assignAutomatically = (datesOfSem) => {
            for(let a of allocatedFaculty){
                for(let b of offeredCourses){
                    if(a.offerCourseId === b.offerCourseId && b.addedInTimetable === false && b.allocated === true
                        && b.department_id == department_id && b.batchId == batchId && b.semester == semester){
                            
                            let weekdays=0;
                            let result = false;
                            for(let x in datesOfSem){
                                for(let k of instituteHours){

                                    result = isCrHrsIncompleteForTheWeek(b);
                                    
                                    if(result){

                                        let courseConflict = false;
                                        let facultyConflict = false;
                                        let roomConflict = false;

                                        let startTime = new Date();
                                        let endTime = new Date();
                                        
                                        startTime.setHours(k[0].substring(0, 2), k[0].substring(3), 0, 0);
                                        endTime.setHours(k[1].substring(0, 2), k[1].substring(3), 0, 0);

                                        const dateObject = new Date(datesOfSem[x]);
                                        const options = { weekday: 'long' };
                                        const fullDayName = dateObject.toLocaleString('en-US', options);
                                        
                                        // course conflict
                                        for (let i = 0; i < tempAssignedCourses.length; i++) {
                                            if(tempAssignedCourses[i].department_id === b.department_id 
                                                && tempAssignedCourses[i].semesterType === extractSemesterType 
                                                && tempAssignedCourses[i].day === fullDayName && tempAssignedCourses[i].batchId === b.batchId
                                                && format(new Date(datesOfSem[x]), 'MM/dd/yyyy') == tempAssignedCourses[i].date){

                                                    var assignedStartTime = new Date();
                                                    var assignedEndTime = new Date();
                                
                                                    assignedStartTime.setHours(tempAssignedCourses[i].startTime.substring(0, 2), 
                                                        tempAssignedCourses[i].startTime.substring(3), 0, 0);
                                                    assignedEndTime.setHours(tempAssignedCourses[i].endTime.substring(0, 2), 
                                                        tempAssignedCourses[i].endTime.substring(3), 0, 0);
                                
                                                    courseConflict = checkConflict(startTime, assignedStartTime, endTime, assignedEndTime,
                                                    startTime.getTime(), assignedStartTime.getTime(), endTime.getTime(), 
                                                    assignedEndTime.getTime());
                                
                                                    if(courseConflict){
                                                        break
                                                    }
                                            }
                                        }

                                        // staff conflict
                                        if(!courseConflict){
                                            
                                            for(let j = 0; j < tempRequestedStaff.length; j++){
                                                
                                                let facultyStartTime = new Date();
                                                let facultyEndTime = new Date();
                                                
                                                facultyStartTime.setHours(tempRequestedStaff[j].startTime.substring(0, 2), 
                                                    tempRequestedStaff[j].startTime.substring(3), 0, 0);
                                                facultyEndTime.setHours(tempRequestedStaff[j].endTime.substring(0, 2), 
                                                    tempRequestedStaff[j].endTime.substring(3), 0, 0);

                                                if (tempRequestedStaff[j].requested_faculty_id === a.faculty_id 
                                                    && daysOfWeek[new Date(tempRequestedStaff[j].date).getDay()] === fullDayName
                                                    && format(new Date(datesOfSem[x]), 'MM/dd/yyyy') == tempRequestedStaff[j].date) {

                                                    facultyConflict = checkConflict(startTime, facultyStartTime, endTime, facultyEndTime,
                                                    startTime.getTime(), facultyStartTime.getTime(), endTime.getTime(), 
                                                    facultyEndTime.getTime());
                                
                                                    if(facultyConflict){
                                                        break
                                                    }
                                                }
                                            }
                                        }

                                        let roomId = 0;
                                        // room conflict
                                        if(!courseConflict && !facultyConflict){
                                            
                                            for(let z of rooms){
                                                if(z.department_id === b.department_id){
                                                    roomId = z.room_id
                                                    for (let k = 0; k < tempAssignedCourses.length; k++) {
                                                        let roomStartTime = new Date();
                                                        let roomEndTime = new Date();
                                            
                                                        roomStartTime.setHours(tempAssignedCourses[k].startTime.substring(0, 2), 
                                                            tempAssignedCourses[k].startTime.substring(3), 0, 0);
                                                        roomEndTime.setHours(tempAssignedCourses[k].endTime.substring(0, 2), 
                                                            tempAssignedCourses[k].endTime.substring(3), 0, 0);
                                            
                                                        if(roomId === tempAssignedCourses[k].room_id 
                                                            && daysOfWeek[new Date(tempAssignedCourses[k].date).getDay()] === fullDayName
                                                            && format(new Date(datesOfSem[x]), 'MM/dd/yyyy') == tempAssignedCourses[k].date){
                                                                
                                                                roomConflict = checkConflict(startTime, roomStartTime, endTime, roomEndTime,
                                                                    startTime.getTime(), roomStartTime.getTime(), endTime.getTime(), 
                                                                    roomEndTime.getTime())
                                                                
                                                                if (roomConflict) {
                                                                    break
                                                                }
                                                        }
                                                    }
                                                }
                                            }

                                        }

                                        if(courseConflict || facultyConflict || roomConflict){
                                            continue
                                        } else {
                                            const assignCourse = {
                                                batchId: b.batchId,
                                                department_id: b.department_id,
                                                semesterType: extractSemesterType,
                                                faculty_id: a.faculty_id,
                                                course_id: b.course_id,
                                                day: fullDayName,
                                                room_id: roomId,
                                                startTime: format(new Date(startTime), 'HH:mm'),
                                                endTime: format(new Date(endTime), 'HH:mm'),
                                                date: format(new Date(datesOfSem[x]), 'MM/dd/yyyy'),
                                                institute_id
                                            }
                                        
                                            const request= {
                                                department_id: b.department_id,
                                                institute_id,
                                                user_id,
                                                room_id: roomId,
                                                requested_faculty_id: a.faculty_id,
                                                date: format(new Date(datesOfSem[x]), 'MM/dd/yyyy'),
                                                startTime: format(new Date(startTime), 'HH:mm'),
                                                endTime: format(new Date(endTime), 'HH:mm'),
                                            }
                                            
                                            dictionary[b.course_id]++
                                            dispatch(assignCourseRequest(assignCourse, request, b.offerCourseId))
                                            tempAssignedCourses.push(assignCourse)
                                            tempRequestedRooms.push(request)
                                            tempRequestedStaff.push(request)
                                            break
                                        }
                                    } else {
                                        result=false;
                                        break;
                                    }
                                }
                                weekdays++;

                                if(weekdays===6){
                                    weekdays=0;
                                    result=false;
                                    for (const key in dictionary){
                                        dictionary[key]=0;
                                    }
                                }
                            }
                    }
                }
            }
        }

        if(extractSemesterType === "Fall"){
            const datesOfSem = getDatesBetweenMonths(fallStart, fallEnd);
            assignAutomatically(datesOfSem);
        } else {
            const datesOfSem = getDatesBetweenMonths(springStart, springEnd);
            assignAutomatically(datesOfSem);
        }
        setGenerateTimetableModal(false)
        alert("Timetable generated successfully.");
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
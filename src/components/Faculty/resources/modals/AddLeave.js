import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import dayjs from 'dayjs';
import TextField from '@material-ui/core/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import { checkValidTime } from '../../utils'
import { checkConflict } from '../../../Admin/utils'
import { useSelector, useDispatch } from 'react-redux'
import { addLeave } from '../../../../redux/AddLeaveRequest/addLeaveRequestActions'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getFacultyRequest } from '../../../../redux/GetFaculty/getFacultyActions'
import { assignedCoursesRequest } from '../../../../redux/AssignedCourses/assignedCoursesActions'
import { getCourseRequest } from '../../../../redux/GetCourse/getCourseActions'
import { getStaffRequest } from '../../../../redux/GetStaffRequest/getStaffReqActions'
import { jaccardRequest } from '../../../../redux/Jaccard/jaccardActions'
import { updateAssignedCourse } from '../../../../redux/UpdateAssignedCourse/updateAssignedCourseActions'
import { getRoomRequest } from '../../../../redux/GetRoomRequests/getRoomReqActions'
import { deletassignedCourseRequest } from '../../../../redux/DeleteAssignedCourse/deleteAssignedCourseActions'
import { deleteRequestedRoom } from '../../../../redux/DeleteRoomRequest/delRoomReqActions'
import { getBatchesRequest } from '../../../../redux/GetBatches/getBatchesActions' 
import { addNotificationRequest } from '../../../../redux/AddNotification/addNotificationActions'
import { addWeightageRequest } from '../../../../redux/AddWeightage/addWeightageActions'

function AddLeave(props) {

    const { openLeaveModal, setLeaveModal } = props

    const dispatch = useDispatch()

    const institute_id = Number(localStorage.getItem('institute_id'))
    const faculty_id = Number(localStorage.getItem('faculty_id'))
    const user_id = Number(localStorage.getItem('user_id'))
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const assignedCourses = useSelector((state) => state.assignedCoursesReducer.assignedCourses.data)
    const assignedCoursesAdded = useSelector((state) => state.assignedCoursesReducer.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const requestedStaff = useSelector((state) => state.staffReqReducer.staff_req.data)
    const requestedRooms = useSelector((state) => state.getRoomRequest.room_req.data)
    const jaccardFaculty = useSelector((state) => state.jaccardReducer.faculty)
    const jaccardFacultyAdded = useSelector((state) => state.jaccardReducer.added)
    const facultyName = localStorage.getItem('name')
    const batches = useSelector((state) => state.getBatchesReducer.batches.data)

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));
    const [dispatchJaccard, setDispatchJaccard] = useState(false)

    const [request, setRequest] = useState({
        reason: "",
        institute_id,
        faculty_id,
        department_id: '',
        user_id,
        requested_faculty_id: faculty_id,
        date: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm'),
    })

    const [notifications, setNotifications] = useState([]);
    const [jaccardCourses, setJaccardCourses] = useState([]);

    useEffect(() => {
        if(dispatchJaccard && jaccardCourses.length === jaccardFaculty.length && jaccardFacultyAdded && jaccardCourses.length > 0 && jaccardFaculty.length > 0){
            dispatch(addWeightageRequest({institute_id, jaccardResults: jaccardFaculty, assignedCourse: jaccardCourses}))
            for(let i of jaccardCourses){
                dispatch(updateAssignedCourse(i, false, 0))
            }
            
            for(let l in requestedRooms){
                for(let k in jaccardCourses){
                    if(requestedRooms[l].room_id === jaccardCourses[k].room_id && requestedRooms[l].startTime === jaccardCourses[k].startTime
                        && requestedRooms[l].endTime === jaccardCourses[k].endTime 
                        && requestedRooms[l].date === format(new Date(jaccardCourses[k].date), 'MM/dd/yyyy')){
                            dispatch(deleteRequestedRoom(requestedRooms[l].room_req_id))
                    }   
                }
            }
            setDispatchJaccard(false)
        }
    }, [dispatchJaccard, jaccardFacultyAdded, jaccardFaculty, jaccardCourses])

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(assignedCoursesRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
            dispatch(getStaffRequest(institute_id))
            dispatch(getRoomRequest(institute_id))
            dispatch(getBatchesRequest(institute_id))
        }
    },[institute_id, dispatch])

    useEffect(() => {
        if(faculty_id > 0 && departmentsAdded && facultyAdded){
            for(let i of departments){
                for(let j of faculty){
                    if(i.department_id === j.department_id){
                        setRequest({...request, department_id: i.department_id})
                    }
                }
            }
        }
    }, [faculty_id, departments, departmentsAdded, faculty, facultyAdded])

    const handleDateChange = (newValue) => {
        const object = newValue
        for (const key in object) {
            if (key === '$d') {
                setRequest({ ...request, date: format(new Date(object[key]), 'MM/dd/yyyy') })
            }
        }
        setValue(newValue);
    };

    const handleStartTimeChange = (newValue) => {
        const object = newValue
        for (const key in object) {
            if (key === '$d') {
                setRequest({ ...request, startTime: format(new Date(object[key]), 'HH:mm') })
            }
        }
        setValue(newValue);
    };

    const handleEndTimeChange = (newValue) => {
        const object = newValue
        for (const key in object) {
            if (key === '$d') {
                setRequest({ ...request, endTime: format(new Date(object[key]), 'HH:mm') })
            }
        }
        setValue1(newValue);
    };

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

    const onKeyDown = (e) => {
        e.preventDefault();
     };

    const checkMeetings = (id, startTime, endTime, date) => {
        
        let conflict = false
        let meetingsList = []
        
        for(let i of requestedStaff){
            if(i.requested_faculty_id === id && i.requestedByStaff && i.date === date){

                var startTime = new Date();
                var endTime = new Date();
                var assignedStartTime = new Date();
                var assignedEndTime = new Date();
                
                startTime.setHours(request.startTime.substring(0, 2), request.startTime.substring(3), 0, 0);
                endTime.setHours(request.endTime.substring(0, 2), request.endTime.substring(3), 0, 0);
                assignedStartTime.setHours(i.startTime.substring(0, 2), i.startTime.substring(3), 0, 0);
                assignedEndTime.setHours(i.endTime.substring(0, 2), i.endTime.substring(3), 0, 0);

                conflict = checkConflict(startTime, assignedStartTime, endTime, assignedEndTime,
                    startTime.getTime(), assignedStartTime.getTime(), endTime.getTime(), assignedEndTime.getTime());

                if(conflict){
                    meetingsList.push(i)
                    conflict = false
                }

            }
        }
        return meetingsList
    }

    const checkCourse = (id, startTime, endTime, date) => {
        
        if(assignedCoursesAdded){
            
            let conflict = false
            let coursesList = []

            for(let i of assignedCourses){
                if(i.faculty_id === id && format(new Date(i.date), 'MM/dd/yyyy') === date){
                    
                    var startTime = new Date();
                    var endTime = new Date();
                    var assignedStartTime = new Date();
                    var assignedEndTime = new Date();
                    
                    startTime.setHours(request.startTime.substring(0, 2), request.startTime.substring(3), 0, 0);
                    endTime.setHours(request.endTime.substring(0, 2), request.endTime.substring(3), 0, 0);
                    assignedStartTime.setHours(i.startTime.substring(0, 2), i.startTime.substring(3), 0, 0);
                    assignedEndTime.setHours(i.endTime.substring(0, 2), i.endTime.substring(3), 0, 0);
                    

                    conflict = checkConflict(startTime, assignedStartTime, endTime, assignedEndTime,
                        startTime.getTime(), assignedStartTime.getTime(), endTime.getTime(), assignedEndTime.getTime());
    
                      if(conflict){
                        coursesList.push(i)
                        conflict = false
                      }

                }
            }
            return coursesList
        }

    }

    const showBestFaculty = (faculty) => {
        faculty.forEach(item => {
            dispatch(jaccardRequest(item));
          });
    }

    const handleForm = (e) => {
        e.preventDefault();

        let startTime = new Date();
        let endTime = new Date();

        startTime.setHours(request.startTime.substring(0, 2), request.startTime.substring(3), 0, 0);
        endTime.setHours(request.endTime.substring(0, 2), request.endTime.substring(3), 0, 0);

        const result = checkValidTime(startTime.getHours(), endTime.getHours(), startTime.getTime(), endTime.getTime())
        if(result){
            alert('Invalid time. Start time should always be less than End time.')
        }else{
            let coursesList = checkCourse(faculty_id, request.startTime, request.endTime, request.date)
            let meetingsList = checkMeetings(faculty_id, request.startTime, request.endTime, request.date)
            
            if(meetingsList.length > 0 ){
                for(let i of meetingsList){

                    let facultyDepartment;

                    for(let j of faculty){
                        for(let k of departments){
                            if(faculty_id === j.faculty_id && j.department_id === k.department_id){
                                facultyDepartment = k.department_name
                            }
                        }
                    }

                    notifications.push({title: facultyName + " (" + facultyDepartment + ")" + " is not available.", 
                                    date: request.date + " Time: " + request.startTime + "-" + request.endTime, 
                                    details: "", 
                                    department_id: request.department_id,
                                    institute_id,
                                    user_id: i.user_id   
                                })
                }
            }

            let coursesLst = []
            let availableFaculty = []

            if(courses.length > 0 && facultyAdded && coursessAdded && coursesList.length > 0){
                for(let a in courses){
                    for(let b of coursesList){
                        if(courses[a].course_id === b.course_id){
                            coursesLst.push({course_id: courses[a].course_id, course_name: courses[a].course_name})
                        }
                    }
                }
                
                for(let i in coursesList){
                    availableFaculty.push([])
                }

                for(let k in coursesLst){
                    for(let i in faculty){
                        if(faculty_id !== faculty[i].faculty_id){
                            for(let j of faculty[i].specialization){
                             if(j === coursesLst[k].course_name){
                                availableFaculty[k].push({faculty_id: faculty[i].faculty_id, course_id: coursesLst[k].course_id, 
                                    course_name: coursesLst[k].course_name, yearsOfExperience: faculty[i].yearsOfExperience})
                             }
                            }
                         }
                    }
                }

                for(let i in availableFaculty){
                    if(availableFaculty[i].length > 0){
                        for(let a of coursesList){
                            
                            let startTime = new Date();
                            let endTime = new Date();
    
                            startTime.setHours(a.startTime.substring(0, 2), a.startTime.substring(3), 0, 0);
                            endTime.setHours(a.endTime.substring(0, 2), a.endTime.substring(3), 0, 0);
                            
                            let facultyConflict = false;
                            for(let j of availableFaculty[i]){
                                for(let k of requestedStaff){
                                    if(j.faculty_id === k.requested_faculty_id && format(new Date(a.date), 'MM/dd/yyyy') === k.date){
    
                                        let assignedStartTime = new Date();
                                        let assignedEndTime = new Date();
    
                                        assignedStartTime.setHours(k.startTime.substring(0, 2), k.startTime.substring(3), 0, 0);
                                        assignedEndTime.setHours(k.endTime.substring(0, 2), k.endTime.substring(3), 0, 0);

                                        facultyConflict = checkConflict(startTime, assignedStartTime, endTime, assignedEndTime,
                                            startTime.getTime(), assignedStartTime.getTime(), endTime.getTime(), assignedEndTime.getTime());
                                        if(facultyConflict){
                                            availableFaculty[i].splice(k, 1)
                                        }
                                    }
                                }
                            }
                            break
                        }
                    }
                }
                
                let facultyListJaccard = []
                for(let i in availableFaculty){
                    if(availableFaculty[i].length > 1){
                        facultyListJaccard.push(availableFaculty[i])
                        for(let j of coursesList){
                            if(j.course_id === availableFaculty[i][0].course_id){
                                jaccardCourses.push(j)
                            }
                        }
                    } 
                    else if (availableFaculty[i].length === 1){
                        let courseName;
                        let batch;
                        let department;
                        let replacedFacultyDepartment;
                        let replacedFacultyName;
                        let facultyUserId;

                        for(let k in coursesList){
                            if(k === i){
                                dispatch(updateAssignedCourse(coursesList[k], false, availableFaculty[i][0].faculty_id))
                                for(let m of coursesLst){
                                    if(coursesList[k].course_id === m.course_id){
                                        courseName = m.course_name
                                    }
                                }
                                for(let n of batches){
                                    for(let o of departments){

                                        for(let p of faculty){
                                            if(p.faculty_id === availableFaculty[i][0].faculty_id){
                                                facultyUserId = p.user.user_id
                                                replacedFacultyName = p.name
                                            }
                                            if(p.department_id === o.department_id && p.faculty_id === availableFaculty[i][0].faculty_id){
                                                replacedFacultyDepartment = o.department_name
                                            }
                                        }

                                        if(n.batchId === coursesList[k].batchId && coursesList[k].department_id === n.department_id
                                            && coursesList[k].department_id === o.department_id){
                                            batch = n.batchYear
                                            department = o.department_name
                                        }
                                    }
                                }

                                notifications.push({title: replacedFacultyName + " (" + replacedFacultyDepartment + ")" + " replaced " + facultyName + " for " + courseName + " (" + batch + "-" + department + ").", 
                                    date: request.date, 
                                    details: "", 
                                    department_id: request.department_id,
                                    institute_id,
                                    user_id: facultyUserId    
                                })
                            }
                        }
                    } else {
                        let courseName;
                        let batch;
                        let department;
                        for(let k in coursesList){
                            if(k === i){
                                for(let l in requestedRooms){
                                    if(requestedRooms[l].room_id === coursesList[k].room_id && requestedRooms[l].startTime === coursesList[k].startTime
                                        && requestedRooms[l].endTime === coursesList[k].endTime 
                                        && requestedRooms[l].date === format(new Date(coursesList[k].date), 'MM/dd/yyyy')){
                                            dispatch(deletassignedCourseRequest(coursesList[k].assignedCourseId))
                                            dispatch(deleteRequestedRoom(requestedRooms[l].room_req_id))

                                            for(let m of coursesLst){
                                                if(coursesList[k].course_id === m.course_id){
                                                    courseName = m.course_name
                                                }
                                            }
                                            for(let n of batches){
                                                for(let o of departments){
                                                    if(n.batchId === coursesList[k].batchId && coursesList[k].department_id === n.department_id
                                                        && coursesList[k].department_id === o.department_id){
                                                        batch = n.batchYear
                                                        department = o.department_name
                                                    }
                                                }
                                            }
                                    }   
                                }

                            }
                        }
                        notifications.push({
                            title: facultyName + "'s " + courseName + " (" + batch + "-" + department + ") class has been cancelled.",  
                            date: request.date, 
                            details: "", 
                            department_id: request.department_id,
                            institute_id
                        })
                    }
                }
                
                if(facultyListJaccard.length > 0){
                    showBestFaculty(facultyListJaccard)
                }
            }
            dispatch(addLeave(request))
            setLeaveModal(false)
            alert("Operation performed successfully!")
            if(notifications.length > 0){
                dispatch(addNotificationRequest(notifications))
            }
        }
        if(jaccardCourses.length > 0){
            setDispatchJaccard(true)
        }
    }
    
    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openLeaveModal}
                onRequestClose={() => setLeaveModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Leave</h2>
                    <form onSubmit={handleForm}>
                        <TextField
                            autoFocus
                            required
                            style={{ marginBottom: '1rem' }}
                            label="Reason"
                            placeholder="Add text here..."
                            variant="outlined"
                            multiline={true}
                            minRows={4}
                            value={request.reason}
                            onChange={(e) => setRequest({ ...request, reason: e.target.value })} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={1.5}>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                        variant="outlined" />} />
                                <TimePicker
                                    value={value}
                                    onChange={handleStartTimeChange}
                                    label="Start Time"
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                        variant="outlined" />} />
                                <TimePicker
                                    value={value1}
                                    onChange={handleEndTimeChange}
                                    label="End Time"
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                        variant="outlined" />} />
                            </Stack>
                            </LocalizationProvider>
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Save</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddLeave
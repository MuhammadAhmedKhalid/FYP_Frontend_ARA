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

function AddLeave(props) {

    const { openLeaveModal, setLeaveModal } = props

    const dispatch = useDispatch()

    const institute_id = useSelector((state) => state.login.user.institute_id)
    const faculty_id = useSelector((state) => state.login.user.faculty_id)
    const user_id = useSelector((state) => state.login.user.user_id)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const assignedCourses = useSelector((state) => state.assignedCoursesReducer.assignedCourses.data)
    const assignedCoursesAdded = useSelector((state) => state.assignedCoursesReducer.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)
    const requestedStaff = useSelector((state) => state.staffReqReducer.staff_req.data)

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(assignedCoursesRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
            dispatch(getStaffRequest(institute_id))
        }
    },[institute_id, dispatch])

    useEffect(() => {
        if(faculty_id > 0 && departmentsAdded && facultyAdded){
            for(let i of departments){
                for(let j of faculty){
                    if(i.department_name === j.department){
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
    }
    )

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
            // if availableFaculty > 1 then pass for best choice (algorithm) 
            // else if === 1 then just assign that course to him/her
            // else (means === 0) make that batch and room free(means delete room request and delete assigned course for that particular day)
            let coursesList = checkCourse(faculty_id, request.startTime, request.endTime, request.date)

            let coursesLst = []
            let availableFaculty = []

            if(courses.length > 0 && facultyAdded && coursessAdded){
                for(let a in courses){
                    for(let b of coursesList){
                        if(courses[a].course_id === b.course_id){
                            coursesLst.push({course_id: courses[a].course_id, course_name: courses[a].course_name})
                        }
                    }
                }
                
                for(let k of coursesLst){
                    for(let i of faculty){
                        if(faculty_id !== i.faculty_id){
                            for(let j of i.specialization){
                             if(j === k.course_name){
                                 availableFaculty.push({faculty_id: i.faculty_id, course_id: k.course_id, course_name: k.course_name})
                             }
                            }
                         }
                    }
                }

                let groups = {};
                for (let obj of availableFaculty) {
                if (groups[obj.course_id]) {
                    groups[obj.course_id].push(obj);
                } else {
                    groups[obj.course_id] = [obj];
                }
                }

                let nestedList = Object.values(groups);

                let list = []
                for(let i of coursesLst){
                    for(let j in nestedList){
                        for(let k of nestedList[j]){
                            if(k.course_id === i.course_id){
                                list.push(nestedList[j])
                            }
                            break
                        }
                    }
                }

                availableFaculty = list

                // console.log(coursesLst)
                 console.log(availableFaculty)

                for(let i in availableFaculty){
                    if(availableFaculty[i].length > 0){
                        for(let a of coursesList){
                            
                            let startTime = new Date();
                            let endTime = new Date();
    
                            startTime.setHours(a.startTime.substring(0, 2), a.startTime.substring(3), 0, 0);
                            endTime.setHours(a.endTime.substring(0, 2), a.endTime.substring(3), 0, 0);
    
                            // console.log(startTime)
                            // console.log(endTime)
                            // console.log(a.date)
                            // console.log(requestedStaff)
                            
                            for(let j of availableFaculty[i]){
                                // console.log(j)
                                for(let k of requestedStaff){
                                    if(j.faculty_id === k.requested_faculty_id && format(new Date(a.date), 'MM/dd/yyyy') === k.date){
    
                                        let assignedStartTime = new Date();
                                        let assignedEndTime = new Date();
    
                                        assignedStartTime.setHours(k.startTime.substring(0, 2), k.startTime.substring(3), 0, 0);
                                        assignedEndTime.setHours(k.endTime.substring(0, 2), k.endTime.substring(3), 0, 0);
    
                                        console.log(assignedStartTime)
                                        console.log(assignedEndTime)
    
                                        // now we have to check if there is any conflict or not
                                        // if conflict = true then remove that faculty from the available faculty list
    
                                        console.log(k)
                                    }
                                }
                            }
                            break
                        }
                    }
                }

                // available faculty ko check karna hai requested staff may
            }
            // dispatch(addLeave(request, coursesLst, availableFaculty))
            // setLeaveModal(false)
            // alert("Operation performed successfully!")
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
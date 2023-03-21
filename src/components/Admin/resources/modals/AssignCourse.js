import React, { useEffect,useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchesRequest } from '../../../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getFacultyRequest } from '../../../../redux/GetFaculty/getFacultyActions'
import { getCourseRequest } from '../../../../redux/GetCourse/getCourseActions'
import TextField from '@material-ui/core/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { checkValidTime } from '../../../Faculty/utils'
import { checkConflict } from '../../utils'
import { getRoomsRequest } from '../../../../redux/GetRooms/getRoomsActions'
import { assignCourseRequest } from '../../../../redux/AssignCourse/assignCourseActions'
import { assignedCoursesRequest } from '../../../../redux/AssignedCourses/assignedCoursesActions'
import { Alert } from '@mui/material';
import { getStaffRequest } from '../../../../redux/GetStaffRequest/getStaffReqActions'
import { getRoomRequest } from '../../../../redux/GetRoomRequests/getRoomReqActions'
import { addRequestedStaff } from '../../../../redux/AddStaffRequest/staffRequestActions'
import { addRequestedRoom } from '../../../../redux/AddRoomRequest/roomRequestActions'

function AssignCourse(props) {

      const { openAssignCourseModal, setOpenAssignCourseModal } = props

      const dispatch = useDispatch()

      const institute_id = useSelector((state) => state.login.user.institute_id)
      const batches = useSelector((state) => state.getBatchesReducer.batches.data)
      const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
      const departments = useSelector((state) => state.getDepartments.departments.data)
      const departmentsAdded = useSelector((state) => state.getDepartments.added)
      const faculty = useSelector((state) => state.getFaculty.faculty)
      const facultyAdded = useSelector((state) => state.getFaculty.added)
      const courses = useSelector((state) => state.getCourseReducer.courses)
      const coursessAdded = useSelector((state) => state.getCourseReducer.added)
      const rooms = useSelector((state) => state.getRooms.rooms.data)
      const roomsAdded = useSelector((state) => state.getRooms.added)
      const assignedCourses = useSelector((state) => state.assignedCoursesReducer.assignedCourses.data)
      const assignedCoursesAdded = useSelector((state) => state.assignedCoursesReducer.added)
      const requestedStaff = useSelector((state) => state.staffReqReducer.staff_req.data)
      const springStart = useSelector((state) => state.login.user.springStartMonth)
      const springEnd = useSelector((state) => state.login.user.springEndMonth)
      const fallStart = useSelector((state) => state.login.user.fallStartMonth)
      const fallEnd = useSelector((state) => state.login.user.fallEndMonth)

      const [batchesData, setBatchesData] = useState([])
      const [facultyData, setFacultyData] = useState([])
      const [coursesData, setCoursesData] = useState([])
      const [roomsData, setRoomsData] = useState([])
      const [value, setValue] = useState(dayjs(new Date()));
      const [value1, setValue1] = useState(dayjs(new Date()));
      const [showError, setShowError] = useState(false);
      const [errorMsg, setErrorMsg] = useState("");
      const requestedRoom = useSelector((state) => state.getRoomRequest.room_req.data) 

      const [assignCourse, setAssignCourse] = useState({
        batchId: "",
        department_id: "",
        semesterType: "",
        faculty_id: "",
        course_id: "",
        day: "",
        room_id: "",
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm'),
        institute_id
    })

      useEffect(() => {
        let dayNumber = 0;

        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for(let i in weekdays){
          if(weekdays[i] === assignCourse.day){
            dayNumber = i
          }
        }
        if(dayNumber > 0){
          if(assignCourse.semesterType === "Spring"){
            
          }else if(assignCourse.semesterType === "Fall"){

          }
        }
      }, [assignCourse.day, assignCourse.semesterType])

      useEffect(() => {
        
        if(departmentsAdded && coursessAdded && facultyAdded && roomsAdded){
          
          setCoursesData([])
          setFacultyData([])
          setRoomsData([])

          for(let i in courses){
            if(assignCourse.department_id === courses[i].department_id){
              setCoursesData(coursesData => [...coursesData, {id: courses[i].course_id, name: courses[i].course_name}])
            }
          }
          
          let department_name = "";
          for(let i in departments){
            if(assignCourse.department_id === departments[i].department_id){
              department_name = departments[i].department_name
            }
          }

          for(let i in faculty){
            if(department_name === faculty[i].department){
              setFacultyData(facultyData => [...facultyData, { id: faculty[i].faculty_id, name: faculty[i].name }])
            }
          }

          for(let i in rooms){
            if(assignCourse.department_id === rooms[i].department_id){
              setRoomsData(roomsData => [...roomsData, {id: rooms[i].room_id, name: rooms[i].room_name}])
            }
          }

        }
      }, [assignCourse.department_id])

      useEffect(() => {
        if(batchesAdded && departmentsAdded){
          setBatchesData([])
          for(let i in batches){
            for(let j in departments){
              if(batches[i].department_id === departments[j].department_id){
                setBatchesData(batchesData => [...batchesData, {batchId: batches[i].batchId, name: `${batches[i].batchYear} - ${departments[j].department_name}`, 
              department_id: departments[j].department_id}])
              }
            }
          }
        }
      }, [batchesAdded, departmentsAdded])

      useEffect(() => {
        if(institute_id > 0){
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
            dispatch(getRoomsRequest(institute_id))
            dispatch(assignedCoursesRequest(institute_id))
            dispatch(getStaffRequest(institute_id))
            dispatch(getRoomRequest(institute_id))
        }
    }, [institute_id, dispatch])

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

      const handleBatchChange = (e) => {
        for(let i of batchesData){
          if(i.name === e.target.value){
            setAssignCourse({ ...assignCourse, batchId: i.batchId, department_id: i.department_id})
          }
        }
      }

      const handleFacultyChange = (e) => {
        for(let i of facultyData){
          if(i.name === e.target.value){
            setAssignCourse({ ...assignCourse, faculty_id: i.id})
          }
        }
      }

      const handleCourseChange = (e) => {
        for(let i of coursesData){
          if(i.name === e.target.value){
            setAssignCourse({...assignCourse, course_id: i.id})
          }
        }
      }

      const handleRoomChange = (e) => {
        for(let i of roomsData){
          if(i.name === e.target.value){
            setAssignCourse({...assignCourse, room_id: i.id})
          }
        }
      }

      const handleStartTimeChange = (newValue) => {
        const object = newValue
        for (const key in object) {
            if (key === '$d') {
              setAssignCourse({ ...assignCourse, startTime: format(new Date(object[key]), 'HH:mm') })
            }
        }
        setValue(newValue);
    };

    const handleEndTimeChange = (newValue) => {
        const object = newValue
        for (const key in object) {
            if (key === '$d') {
              setAssignCourse({ ...assignCourse, endTime: format(new Date(object[key]), 'HH:mm') })
            }
        }
        setValue1(newValue);
    };

      const onKeyDown = (e) => {
        e.preventDefault();
    };

      const closeModal = () => {
        setOpenAssignCourseModal(false)
        setShowError(false)
      }

      const handleSubmit = (e) => {
        e.preventDefault()

        let startTime = new Date();
        let endTime = new Date();

        startTime.setHours(assignCourse.startTime.substring(0, 2), assignCourse.startTime.substring(3), 0, 0);
        endTime.setHours(assignCourse.endTime.substring(0, 2), assignCourse.endTime.substring(3), 0, 0);

        const result = checkValidTime(startTime.getHours(), endTime.getHours(), startTime.getTime(), endTime.getTime())
        if(result){
            alert('Invalid time. Start time should always be less than End time.')
        }else{
          if(assignedCoursesAdded){  
            let courseConflict = false;
            let facultyConflict = false;
            let roomConflict = false;

            if(assignedCourses.length == 0){
              dispatch(assignCourseRequest(assignCourse))
              // dispatch(addRequestedStaff())
              // dispatch(addRequestedRoom())
              setOpenAssignCourseModal(false)
              setShowError(false)
              alert("Operation performed successfully!")
            }   
            
            for (let i = 0; i < assignedCourses.length; i++) {
              if(assignedCourses[i].department_id === assignCourse.department_id && assignedCourses[i].semesterType === assignCourse.semesterType
                && assignedCourses[i].day === assignCourse.day && assignedCourses[i].batchId === assignCourse.batchId){
                  
                  var assignedStartTime = new Date();
                  var assignedEndTime = new Date();

                  assignedStartTime.setHours(assignedCourses[i].startTime.substring(0, 2), assignedCourses[i].startTime.substring(3), 0, 0);
                  assignedEndTime.setHours(assignedCourses[i].endTime.substring(0, 2), assignedCourses[i].endTime.substring(3), 0, 0);

                  courseConflict = checkConflict(startTime, assignedStartTime, endTime, assignedEndTime,
                    startTime.getTime(), assignedStartTime.getTime(), endTime.getTime(), assignedEndTime.getTime());

                  if(courseConflict){
                    setShowError(true)
                    setErrorMsg('Course is already assigned during this time interval.')
                    break
                  }

                }
            }

            for(let j = 0; j < requestedStaff.length; j++){
                let facultyStartTime = new Date();
                let facultyEndTime = new Date();

                facultyStartTime.setHours(requestedStaff[j].startTime.substring(0, 2), requestedStaff[j].startTime.substring(3), 0, 0);
                facultyEndTime.setHours(requestedStaff[j].endTime.substring(0, 2), requestedStaff[j].endTime.substring(3), 0, 0);

                if ((requestedStaff[j].requested_faculty_id === assignCourse.faculty_id)) {

                  facultyConflict = checkConflict(startTime, facultyStartTime, endTime, facultyEndTime,
                    startTime.getTime(), facultyStartTime.getTime(), endTime.getTime(), facultyEndTime.getTime());

                  if(facultyConflict){
                    setShowError(true)
                    setErrorMsg('Faculty is not available between this time interval.')
                    break
                  }
                }
            }

            for (let k = 0; k < requestedRoom.length; k++){

              let roomStartTime = new Date();
              let roomEndTime = new Date();

              roomStartTime.setHours(requestedRoom[k].startTime.substring(0, 2), requestedRoom[k].startTime.substring(3), 0, 0);
              roomEndTime.setHours(requestedRoom[k].endTime.substring(0, 2), requestedRoom[k].endTime.substring(3), 0, 0);

              roomConflict = checkConflict(startTime, roomStartTime, endTime, roomEndTime,
                  startTime.getTime(), roomStartTime.getTime(), endTime.getTime(), roomEndTime.getTime())

              if (roomConflict) {
                  setShowError(true)
                  setErrorMsg('Room is not available between this time interval.')
                  break
              }

          }

            if(courseConflict || facultyConflict || roomConflict){
              setShowError(true)
            }else {
              // dispatch(assignCourseRequest(assignCourse))
              setOpenAssignCourseModal(false)
              setShowError(false)
              alert("Operation performed successfully!")
            }
            }

        }
      }

      return (
        <div>
          <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openAssignCourseModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Assign Course</h2>
                    <form onSubmit={handleSubmit}>
                      <div style={{ margin: '3px' }} className='flexbox-container-y'>
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
                          }}>Semester type</h3>
                          <select required className='dropdown' onChange={(e) => setAssignCourse({...assignCourse, semesterType: e.target.value})}>
                            <option></option>
                            <option value="Fall">FALL</option>
                            <option value="Spring">SPRING</option>
                          </select>
                          <h3 style={{
                              fontWeight: 'normal', color: 'gray', marginRight: '3px'
                          }}>Faculty</h3>
                          <select required className='dropdown' onChange={handleFacultyChange}>
                          <option></option>
                              {
                                  facultyData.length !== 0 ? facultyData.map(faculty => 
                                      <option key={faculty.id}>{faculty.name}</option>) : null
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
                          }}>Day</h3>
                          <select required className='dropdown' onChange={(e) => setAssignCourse({...assignCourse, day: e.target.value})}>
                            <option></option>
                            <option value="Monday">MONDAY</option>
                            <option valye="Tuesday">TUESDAY</option>
                            <option value="Wednesday">WEDNESDAY</option>
                            <option valye="Thursday">THURSDAY</option>
                            <option value="Friday">FRIDAY</option>
                            <option valye="Saturday">SATURDAY</option>
                            <option value="Sunday">SUNDAY</option>
                          </select>
                          <h3 style={{
                              fontWeight: 'normal', color: 'gray', marginRight: '3px'
                          }}>Room</h3>
                          <select required className='dropdown' onChange={handleRoomChange}>
                          <option></option>
                              {
                                  roomsData.length !== 0 ? roomsData.map(room => 
                                      <option key={room.id}>{room.name}</option>) : null
                              }
                          </select>
                          <div style={{ marginTop: '12px' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={1.5}>
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
                            </div>
                      </div>
                      <div>
                        {
                            showError && <Alert style={{ marginTop: '12px' }} severity="error">{errorMsg}</Alert>
                        }
                      </div>
                      <center><button className='modal-btn' style={{marginTop: '20px'}} type='submit'>Add</button></center>
                    </form>
                </div>
            </Modal>
        </div>
      )
    }

    export default AssignCourse
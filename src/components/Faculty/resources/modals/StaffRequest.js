import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getRoomsRequest } from '../../../../redux/GetRooms/getRoomsActions'
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@material-ui/core/TextField'
import { Alert } from '@mui/material';
import { getFacultyRequest } from '../../../../redux/GetFaculty/getFacultyActions'
import { addRequestedStaff } from '../../../../redux/AddStaffRequest/staffRequestActions'
import { getStaffRequest } from '../../../../redux/GetStaffRequest/getStaffReqActions'
import { checkConflict } from '../../utils'
import { getRoomRequest } from '../../../../redux/GetRoomRequests/getRoomReqActions'
import { addNotificationRequest } from '../../../../redux/AddNotification/addNotificationActions'

function StaffRequest(props) {

    const { openStaffModal, setStaffModal } = props

    const dispatch = useDispatch()

    const institute_id = localStorage.getItem('institute_id')
    const user_id = localStorage.getItem('user_id')
    const faculty_id = localStorage.getItem('faculty_id')
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)
    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)
    const requestedStaff = useSelector((state) => state.staffReqReducer.staff_req.data)
    const requestSuccessfull = useSelector((state) => state.addStaffReqeReducer.added)
    const requestedRoom = useSelector((state) => state.getRoomRequest.room_req.data)
    const facultyName = localStorage.getItem('name')

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));
    const [showError, setShowError] = useState(false);
    const [roomsData, setRoomsData] = useState([])
    const [facultyData, setFacultyData] = useState([])
    const [requestAdded, setRequestAdded] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const [request, setRequest] = useState({
        department_id: '',
        institute_id,
        user_id,
        room_id: '',
        requested_faculty_id: '',
        date: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm'),
        requestedByStaff: true
    })

    useEffect(()=>{
        if ((requestAdded || requestSuccessfull) && institute_id > 0) {
            dispatch(getStaffRequest(institute_id))
            dispatch(getRoomRequest(institute_id))
            setRequestAdded(false)
        }
    }, [requestAdded, requestSuccessfull, institute_id])


    useEffect(()=>{
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getRoomsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
        }
    }, [institute_id])

    useEffect(() => {
        if (roomsAdded && departmentsAdded && facultyAdded) {
            if (rooms.length !== 0 && departments.length !== 0 && faculty.length !== 0) {
                setRoomsData([])
                setFacultyData([])
                for (let i = 0; i < rooms.length; i++) {
                    for (let j = 0; j < departments.length; j++) {
                        if (rooms[i].department_id === departments[j].department_id && departments[j].department_id === request.department_id) {
                            setRoomsData(roomsData => [...roomsData, { id: rooms[i].room_id, name: rooms[i].room_name }])
                        }
                    }
                }
                for (let i = 0; i < faculty.length; i++) {
                    for (let j = 0; j < departments.length; j++) {
                        if (faculty[i].department_id === departments[j].department_id && departments[j].department_id === request.department_id 
                            && faculty[i].user.user_id !== user_id) {
                            setFacultyData(facultyData => [...facultyData, { id: faculty[i].faculty_id, name: faculty[i].name }])
                        }
                    }
                }
            }
        }
    }, [request.department_id])

    const handleRoomChange = (event) => {
        const room_name = event.target.value
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room_name === room_name) {
                setRequest({ ...request, room_id: rooms[i].room_id })
            }
        }
    }

    const handleDepartmentChange = (event) => {
        const department_name = event.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setRequest({ ...request, department_id: departments[i].department_id })
            }
        }
    }

    const handleFacultyChange = (event) => {
        const faculty_name = event.target.value
        for (let i = 0; i < faculty.length; i++) {
            if (faculty[i].name === faculty_name) {
                setRequest({ ...request, requested_faculty_id: faculty[i].faculty_id })
            }
        }
    }

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

    const closeModal = () => {
        setStaffModal(false)
        setShowError(false)
    }

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    const addStaffRequest = () => {

        let facultyDepartment;
        let roomName;
        let roomDept;
        let requestedFaculty;
        let requestedFacultyName;

        for(let k of faculty){
            if(k.faculty_id === request.requested_faculty_id){
                requestedFaculty = k.user.user_id
                requestedFacultyName = k.user.name
            }
            if(k.faculty_id === faculty_id){
                facultyDepartment = k.department_id
            }
        }

        for(let i of rooms){
            for(let j of departments){
                if(i.room_id === request.room_id && j.department_id === i.department_id){
                    roomName = i.room_name
                    roomDept = j.department_name
                }
                if(j.department_id === facultyDepartment){
                    facultyDepartment = j.department_name
                }
            }
        }

        notifications.push({title: facultyName + " (" + facultyDepartment + ")" + " invited " + requestedFacultyName + " in " + roomName + " (" + roomDept + ").", 
                                    date: request.date + " Time: " + request.startTime + "-" + request.endTime, 
                                    details: "", 
                                    department_id: request.department_id,
                                    institute_id,
                                    user_id: requestedFaculty   
                                })

        setStaffModal(false)
        alert("Operation performed successfully!")
        dispatch(addRequestedStaff(request))
        if(notifications.length > 0){
            dispatch(addNotificationRequest(notifications))
        }
        if (requestSuccessfull) {
            setRequestAdded(true)
            setShowError(false)
        }
    }

    const handleForm = (e) => {
        let faculty_conflict = false;
        let room_conflict = false;
        e.preventDefault();
        
        if(requestedStaff.length === 0 && requestedRoom.length === 0){
            addStaffRequest()
        } else {

            var requestStartTime = new Date();
            var requestEndTime = new Date();

            requestStartTime.setHours(request.startTime.substring(0, 2), request.startTime.substring(3), 0, 0);
            requestEndTime.setHours(request.endTime.substring(0, 2), request.endTime.substring(3), 0, 0);

            for (let i = 0; i < requestedStaff.length; i++) {

                let startTime = new Date();
                let endTime = new Date();

                startTime.setHours(requestedStaff[i].startTime.substring(0, 2), requestedStaff[i].startTime.substring(3), 0, 0);
                endTime.setHours(requestedStaff[i].endTime.substring(0, 2), requestedStaff[i].endTime.substring(3), 0, 0);

                faculty_conflict = checkConflict(requestedStaff[i].requested_faculty_id, request.requested_faculty_id, requestedStaff[i].date, request.date,
                    requestStartTime, startTime, requestEndTime, endTime,
                    requestStartTime.getTime(), startTime.getTime(), requestEndTime.getTime(), endTime.getTime())

                if (faculty_conflict) {
                    console.log(i)
                    setShowError(true)
                    break
                }

            }

            for (let j = 0; j < requestedRoom.length; j++){

                let startTime = new Date();
                let endTime = new Date();

                startTime.setHours(requestedRoom[j].startTime.substring(0, 2), requestedRoom[j].startTime.substring(3), 0, 0);
                endTime.setHours(requestedRoom[j].endTime.substring(0, 2), requestedRoom[j].endTime.substring(3), 0, 0);

                room_conflict = checkConflict(requestedRoom[j].room_id, request.room_id, requestedRoom[j].date, request.date,
                    requestStartTime, startTime, requestEndTime, endTime,
                    requestStartTime.getTime(), startTime.getTime(), requestEndTime.getTime(), endTime.getTime())

                if (room_conflict) {
                    console.log(requestedRoom[j])
                    setShowError(true)
                    break
                }

            }

            if (!faculty_conflict && !room_conflict) {
                addStaffRequest()
                faculty_conflict = false
                room_conflict = false
            }
        }

    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openStaffModal}
                onRequestClose={() => closeModal()}>
                     <div className='center flexbox-container-y'>
                        <h2 style={{ color: "#115868", fontSize: 20 }}>Staff Request</h2>
                        <form onSubmit={handleForm}>
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
                            }}>Room No.</h3>
                            <select required className='dropdown' onChange={handleRoomChange}>
                                <option></option>
                                {
                                    roomsData.length !== 0 ? roomsData.map(room =>
                                        <option key={room.id}>{room.name}</option>) : null
                                }
                            </select>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Faculty</h3>
                            <select required className='dropdown' onChange={handleFacultyChange}>
                                <option></option>
                                {
                                    facultyData.length !==0 ? facultyData.map(faculty =>
                                        <option ket={faculty.id}>{faculty.name}</option>) : null
                                }
                            </select>
                            <div style={{ marginTop: '12px' }}>
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
                        </div>
                        <div>
                            {
                                showError && <Alert style={{ marginTop: '12px' }} severity="error">Faculty member or Room is not available between this interval.</Alert>
                            }
                        </div>
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Save</button>
                        </div>
                        </form>
                     </div>
            </Modal>
        </div>
    )
}

export default StaffRequest
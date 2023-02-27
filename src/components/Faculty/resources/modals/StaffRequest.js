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

function StaffRequest(props) {

    const { openStaffModal, setStaffModal } = props

    const dispatch = useDispatch()

    const institute_id = useSelector((state) => state.login.user.institute_id)
    const user_id = useSelector((state) => state.login.user.user_id)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)
    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));
    const [showError, setShowError] = useState(false);
    const [roomsData, setRoomsData] = useState([])
    const [facultyData, setFacultyData] = useState([])

    const [request, setRequest] = useState({
        department_id: '',
        institute_id,
        user_id,
        room_id: '',
        requested_faculty_id: '',
        date: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm')
    })

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
                        if (faculty[i].department === departments[j].department_name && departments[j].department_id === request.department_id 
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
    }

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    const handleForm = (e) => {
        e.preventDefault();
        setStaffModal(false)
        alert("Operation performed successfully!")
        dispatch(addRequestedStaff(request))
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
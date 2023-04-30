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
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { getRoomRequest } from '../../../../redux/GetRoomRequests/getRoomReqActions'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getRoomsRequest } from '../../../../redux/GetRooms/getRoomsActions'
import { addRequestedRoom } from '../../../../redux/AddRoomRequest/roomRequestActions'
import { checkConflict } from '../../utils'

function RequestRoom(props) {

    const { openRoomModal, setRoomModal } = props

    const dispatch = useDispatch()

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));
    const [showError, setShowError] = useState(false);
    const [requestAdded, setRequestAdded] = useState(true);
    const [roomsData, setRoomsData] = useState([])

    const requestSuccessfull = useSelector((state) => state.addRoomRequest.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)
    const roomsRequest = useSelector((state) => state.getRoomRequest.room_req.data)
    const institute_id = localStorage.getItem('institute_id')
    const user_id = Number(localStorage.getItem('user_id'))

    const [request, setRequest] = useState({
        department_id: '',
        institute_id,
        user_id,
        room_id: '',
        date: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm')
    })

    useEffect(() => {
        if (roomsAdded && departmentsAdded) {
            if (rooms.length !== 0 && departments.length !== 0) {
                setRoomsData([])
                for (let i = 0; i < rooms.length; i++) {
                    for (let j = 0; j < departments.length; j++) {
                        if (rooms[i].department_id === departments[j].department_id && departments[j].department_id === request.department_id) {
                            setRoomsData(roomsData => [...roomsData, { id: rooms[i].room_id, name: rooms[i].room_name }])
                        }
                    }
                }
            }
        }
    }, [request.department_id])

    useEffect(() => {
        if ((requestAdded || requestSuccessfull) && institute_id > 0) {
            dispatch(getRoomRequest(institute_id))
            setRequestAdded(false)
        }
    }, [requestAdded, requestSuccessfull, institute_id])

    useEffect(() => {
        dispatch(getDepartmentsRequest(institute_id))
        dispatch(getRoomsRequest(institute_id))
    }, [institute_id])

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

    const handleRoomChange = (event) => {
        const room_name = event.target.value
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room_name === room_name && rooms[i].department_id === request.department_id) {
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

    const addRoomRequest = () => {
        setRoomModal(false)
        alert("Operation performed successfully!")
        dispatch(addRequestedRoom(request))
        if (requestSuccessfull) {
            setRequestAdded(true)
            setShowError(false)
        }
    }

    const handleForm = (e) => {

        let conflict = false;
        e.preventDefault();

        if (roomsRequest.length === 0) {
            addRoomRequest()
        } else {
            for (let i = 0; i < roomsRequest.length; i++) {

                var roomStartTime = new Date();
                var roomEndTime = new Date();
                var requestStartTime = new Date();
                var requestEndTime = new Date();

                roomStartTime.setHours(roomsRequest[i].startTime.substring(0, 2), roomsRequest[i].startTime.substring(3), 0, 0);
                roomEndTime.setHours(roomsRequest[i].endTime.substring(0, 2), roomsRequest[i].endTime.substring(3), 0, 0);
                requestStartTime.setHours(request.startTime.substring(0, 2), request.startTime.substring(3), 0, 0);
                requestEndTime.setHours(request.endTime.substring(0, 2), request.endTime.substring(3), 0, 0);

                conflict = checkConflict(roomsRequest[i].room_id, request.room_id, roomsRequest[i].date, request.date,
                    requestStartTime, roomStartTime, requestEndTime, roomEndTime,
                    requestStartTime.getTime(), roomStartTime.getTime(), requestEndTime.getTime(), roomEndTime.getTime())

                if (conflict) {
                    setShowError(true)
                    break
                }

            }
            if (!conflict) {
                addRoomRequest()
                conflict = false
            }
        }
    }

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
        setRoomModal(false)
        setShowError(false)
    }

    const onKeyDown = (e) => {
        e.preventDefault();
     };

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openRoomModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Request Room</h2>
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
                                showError && <Alert style={{ marginTop: '12px' }} severity="error">Room is already occupied between this interval.</Alert>
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

export default RequestRoom
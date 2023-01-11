import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import dayjs from 'dayjs';
import TextField from '@material-ui/core/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import { format } from 'date-fns';
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getRoomsRequest } from '../../../../redux/GetRooms/getRoomsActions'
import { getResourceTypesRequest } from '../../../../redux/GetResourceTypes/getResourceActions'

function ObjectRequest(props) {

    const { openObjectModal, setObjectModal } = props

    const dispatch = useDispatch()

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)

    const [roomsData, setRoomsData] = useState([])

    const objects = useSelector((state) => state.getResourceTypes.resource_types.data)

    const [objectsInfo, setObjectsInfo] = useState([])
    const [objectsData, setObjectsData] = useState([])

    const [objectsRequest, setObjectsRequest] = useState([])

    const [showError, setShowError] = useState(false);
    const [requestAdded, setRequestAdded] = useState(true);

    const [request, setRequest] = useState({
        department_id: '',
        room_id: '',
        resource_type_id: '',
        quantity: '',
        isOccupied: false,
        date: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm'),
    })

    useEffect(() => {
        if (requestAdded) {
            axios.get('http://localhost:8080/getObjectRequests')
                .then((response) => {
                    setObjectsRequest(response.data)
                })
                .catch((error) => { console.log(error) })

            setRequestAdded(false)
        }
    }, [requestAdded])

    useEffect(() => {
        if (roomsAdded) {
            if (objects.length !== 0 && rooms.length !== 0) {
                setObjectsData([])
                for (let i = 0; i < objects.length; i++) {
                    for (let j = 0; j < objectsInfo.length; j++) {
                        for (let k = 0; k < rooms.length; k++) {
                            if (objects[i].resource_type_id === objectsInfo[j].resource_type_id && objectsInfo[j].room_id === rooms[k].room_id &&
                                request.room_id === rooms[k].room_id) {
                                setObjectsData(objectsData => [...objectsData, { id: objects[i].resource_type_id, name: objects[i].name }])
                            }
                        }
                    }
                }
            }
        }
    }, [request.room_id])

    useEffect(() => {
        if (departmentsAdded) {
            if (rooms.length !== 0 && departments.length !== 0) {
                setRoomsData([])
                setObjectModal([])
                for (let i = 0; i < rooms.length; i++) {
                    for (let j = 0; j < departments.length; j++) {
                        if (rooms[i].department_id === departments[j].department_id && departments[j].department_id === request.department_id) {
                            setRoomsData(roomsData => [...roomsData, { id: rooms[i].room_id, name: rooms[i].name }])
                        }
                    }
                }
            }
        }
    }, [request.department_id])

    useEffect(() => {
        dispatch(getDepartmentsRequest())
        dispatch(getRoomsRequest())
        dispatch(getResourceTypesRequest())
        axios.get('http://localhost:8080/resources')
            .then((response) => { setObjectsInfo(response.data) })
            .catch((error) => { console.log(error) })
    }, [])

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

    const handleDepartmentChange = (event) => {
        const department_name = event.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setRequest({ ...request, department_id: departments[i].department_id })
            }
        }
    }

    const handleRoomChange = (event) => {
        const room_name = event.target.value
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].name === room_name) {
                setRequest({ ...request, room_id: rooms[i].room_id })
            }
        }
    }

    const handleObjectChange = (event) => {
        const object_name = event.target.value
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].name === object_name) {
                setRequest({ ...request, resource_type_id: objects[i].resource_type_id })
            }
        }
    }

    const addObjectRequest = () => {
        setShowError(false)
        axios.post('http://localhost:8080/addObjectRequest', request)
            .then((response) => {
                console.log(response)
                setObjectModal(false)
                setRequestAdded(true)
            })
            .catch((error) => { console.log(error) })
    }

    const handleForm = (e) => {
        let conflict = false;
        e.preventDefault();
        if (objectsRequest.length === 0) {
            addObjectRequest()
        } else {
            let alreadyRequestedQuantity = 0
            for (let i = 0; i < objectsRequest.length; i++) {
                var objectStartTime = new Date();
                var objectEndTime = new Date();
                objectStartTime.setHours(objectsRequest[i].startTime.substring(0, 2), objectsRequest[i].startTime.substring(3), 0, 0);
                objectEndTime.setHours(objectsRequest[i].endTime.substring(0, 2), objectsRequest[i].endTime.substring(3), 0, 0);

                var requestStartTime = new Date();
                var requestEndTime = new Date();
                requestStartTime.setHours(request.startTime.substring(0, 2), request.startTime.substring(3), 0, 0);
                requestEndTime.setHours(request.endTime.substring(0, 2), request.endTime.substring(3), 0, 0);

                if ((objectsRequest[i].resource_type_id === request.resource_type_id && request.date === objectsRequest[i].date)) {
                    if ((requestStartTime.getTime() === objectEndTime.getTime() || requestEndTime.getTime() === objectStartTime.getTime())) {
                        continue;
                    }
                    if ((Math.min(requestStartTime, requestEndTime) <= Math.max(objectStartTime, objectEndTime) &&
                        Math.max(requestStartTime, requestEndTime) >= Math.min(objectStartTime, objectEndTime))) {

                        alreadyRequestedQuantity += objectsRequest[i].quantity
                    }
                }
            }
            let availableQuantity = 0
            for (let j = 0; j < objectsInfo.length; j++) {
                if (objectsInfo[j].resource_type_id === request.resource_type_id) {
                    availableQuantity = objectsInfo[j].quantity - alreadyRequestedQuantity
                    break
                }
            }
            console.log(alreadyRequestedQuantity)
            console.log(availableQuantity)
            console.log(request.quantity)
            if (availableQuantity < request.quantity) {
                setShowError(true)
                conflict = true
            }
            if (!conflict) {
                addObjectRequest()
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

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openObjectModal}
                onRequestClose={() => setObjectModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Object Request</h2>
                    <form onSubmit={handleForm}>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Department</h3>
                        <select className='dropdown' onChange={handleDepartmentChange}>
                            <option></option>
                            {
                                departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                    <option key={department.department_id}>{department.department_name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Room No.</h3>
                        <select className='dropdown' onChange={handleRoomChange}>
                            <option></option>
                            {
                                roomsData.length !== 0 ? roomsData.map(room =>
                                    <option key={room.id}>{room.name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Name</h3>
                        <select className='dropdown' onChange={handleObjectChange}>
                            <option></option>
                            {
                                objectsData.length !== 0 ? objectsData.map(object =>
                                    <option key={object.id}>{object.name}</option>) : null
                            }
                        </select>
                        <TextField
                            value={request.quantity}
                            onChange={(e) => setRequest({ ...request, quantity: e.target.value })}
                            label='Quantity'
                            style={{ marginTop: '12px' }}
                            size='small'
                            variant="outlined"
                            type='number' />
                        <div style={{ marginTop: '12px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={1.5}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={value}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params}
                                            variant="outlined" />} />
                                    <TimePicker
                                        value={value}
                                        onChange={handleStartTimeChange}
                                        label="Start Time"
                                        renderInput={(params) => <TextField {...params}
                                            variant="outlined" />} />
                                    <TimePicker
                                        value={value1}
                                        onChange={handleEndTimeChange}
                                        label="End Time"
                                        renderInput={(params) => <TextField {...params}
                                            variant="outlined" />} />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div>
                            {
                                showError && <Alert style={{ marginTop: '12px' }} severity="error">Object is already occupied between this interval.</Alert>
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

export default ObjectRequest
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import dayjs from 'dayjs';
import TextField from '@material-ui/core/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { format } from 'date-fns';

function ObjectRequest(props) {

    const { openObjectModal, setObjectModal } = props

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));

    const [maxQuantity, setMaxQuantity] = useState(0)

    const [departments, setDeaprtments] = useState([])

    const [rooms, setRooms] = useState([])
    const [roomsData, setRoomsData] = useState([])

    const [objects, setObjects] = useState([])
    const [objectsInfo, setObjectsInfo] = useState([])
    const [objectsData, setObjectsData] = useState([])

    const [request, setRequest] = useState({
        department_id: '',
        room_id: '',
        resource_type_id: '',
        quantity: '',
        startDate: format(new Date(), 'MM/dd/yyyy'),
        endDate: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm'),
    })

    useEffect(() => {
        if (objects.length !== 0 && rooms.length !== 0) {
            setObjectsData([])
            for (let i = 0; i < objects.length; i++) {
                for (let j = 0; j < objectsInfo.length; j++) {
                    for (let k = 0; k < rooms.length; k++) {
                        if (objects[i].resource_type_id === objectsInfo[j].resource_type_id && objectsInfo[j].room_id === rooms[k].room_id &&
                            request.room_id == rooms[k].room_id) {
                            setObjectsData(objectsData => [...objectsData, { id: objects[i].resource_type_id, name: objects[i].name }])
                        }
                    }
                }
            }
        }
    }, [request.room_id])

    useEffect(() => {
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
    }, [request.department_id])

    useEffect(() => {
        axios.get('http://localhost:8080/departments')
            .then((response) => { setDeaprtments(response.data) })
            .catch((error) => { console.log(error) })
        axios.get('http://localhost:8080/rooms')
            .then((response) => { setRooms(response.data) })
            .catch((error) => { console.log(error) })
        axios.get('http://localhost:8080/resourceTypes')
            .then((response) => { setObjects(response.data) })
            .catch((error) => { console.log(error) })
        axios.get('http://localhost:8080/resources')
            .then((response) => { setObjectsInfo(response.data) })
            .catch((error) => { console.log(error) })
    }, [])

    const handleStartDatetTimeChange = (newValue) => {
        const object = newValue
        for (const key in object) {
            if (key === '$d') {
                setRequest({ ...request, startDate: format(new Date(object[key]), 'MM/dd/yyyy'), startTime: format(new Date(object[key]), 'HH:mm') })
            }
        }
        setValue(newValue);
    };

    const handleEndDatetTimeChange = (newValue) => {
        const object = newValue
        for (const key in object) {
            if (key === '$d') {
                setRequest({ ...request, endDate: format(new Date(object[key]), 'MM/dd/yyyy'), endTime: format(new Date(object[key]), 'HH:mm') })
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
            for (let j = 0; j < objectsInfo.length; i++) {
                if (objects[i].name === object_name && objects[i].resource_type_id === objectsInfo[j].resource_type_id) {
                    setRequest({ ...request, resource_type_id: objects[i].resource_type_id })
                    setMaxQuantity(objectsInfo[j].quantity)
                }
            }
        }
    }

    const handleForm = (e) => {
        e.preventDefault();
        setObjectModal(false)
        axios.post('http://localhost:8080/addObjectRequest', request)
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error) })
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
                                departments.length !== 0 ? departments.map(department =>
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
                            type='number'
                            inputProps={{ min: 0, max: maxQuantity }} />
                        <div style={{ marginTop: '12px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={1.5}>
                                    <DateTimePicker
                                        label="Start Date and Time"
                                        value={value}
                                        onChange={handleStartDatetTimeChange}
                                        minDate={new Date()}
                                        inputFormat='MM/DD/YYYY HH:mm'
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DateTimePicker
                                        label="End Date and Time"
                                        value={value1}
                                        onChange={handleEndDatetTimeChange}
                                        minDate={new Date()}
                                        inputFormat='MM/DD/YYYY HH:mm'
                                        renderInput={(params) => <TextField {...params} />}
                                    />
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

export default ObjectRequest
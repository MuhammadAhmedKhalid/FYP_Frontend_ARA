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
    const [departments, setDeaprtments] = useState([])
    const [rooms, setRooms] = useState([])
    const [objects, setObjects] = useState([])
    const [request, setRequest] = useState({
        department: '',
        room: '',
        object: '',
        quantity: '',
        startDate: format(new Date(), 'MM/dd/yyyy'),
        endDate: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm'),
    })

    console.log(request)

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
                    <form>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Department</h3>
                        <select className='dropdown' value={request.department} onChange={(e) => setRequest({ ...request, department: e.target.value })}>
                            <option></option>
                            {
                                departments.length !== 0 ? departments.map(department =>
                                    <option key={department.department_id}>{department.department_name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Room No.</h3>
                        <select className='dropdown' value={request.room} onChange={(e) => setRequest({ ...request, room: e.target.value })}>
                            <option></option>
                            {
                                rooms.length !== 0 ? rooms.map(room =>
                                    <option key={room.room_id}>{room.name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Name</h3>
                        <select className='dropdown' value={request.object} onChange={(e) => setRequest({ ...request, object: e.target.value })}>
                            <option></option>
                            {
                                objects.length !== 0 ? objects.map(object =>
                                    <option key={object.resource_type_id}>{object.name}</option>) : null
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
                                    <DateTimePicker
                                        label="Start Date and Time"
                                        value={value}
                                        onChange={handleStartDatetTimeChange}
                                        minDate={new Date()}
                                        inputFormat='MM/DD/YYYY HH:MM'
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DateTimePicker
                                        label="End Date and Time"
                                        value={value1}
                                        onChange={handleEndDatetTimeChange}
                                        minDate={new Date()}
                                        inputFormat='MM/DD/YYYY HH:MM'
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
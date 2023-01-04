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

function ObjectRequest(props) {

    const { openObjectModal, setObjectModal } = props

    const [value, setValue] = useState(dayjs(new Date()));
    const [departments, setDeaprtments] = useState([])
    const [rooms, setRooms] = useState([])
    const [objects, setObjects] = useState([])

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

    const handleChange = (newValue) => {
        setValue(newValue);
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
                        <select className='dropdown'>
                            {
                                departments.length !== 0 ? departments.map(department =>
                                    <option key={department.department_id}>{department.department_name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Room No.</h3>
                        <select className='dropdown'>
                            {
                                rooms.length !== 0 ? rooms.map(room =>
                                    <option key={room.room_id}>{room.name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Name</h3>
                        <select className='dropdown'>
                            {
                                objects.length !== 0 ? objects.map(object =>
                                    <option key={object.resource_type_id}>{object.name}</option>) : null
                            }
                        </select>
                        <div style={{ marginTop: '12px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={1.5}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params}
                                            variant="outlined" />} />
                                    <TimePicker
                                        value={value}
                                        onChange={handleChange}
                                        label="Start Time"
                                        renderInput={(params) => <TextField {...params}
                                            variant="outlined" />} />
                                    <TimePicker
                                        label="End Time"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params}
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

export default ObjectRequest
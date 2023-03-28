import React, { useState } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { addLeave } from '../../../../redux/AddLeaveRequest/addLeaveRequestActions'

function AddLeave(props) {

    const { openLeaveModal, setLeaveModal } = props

    const dispatch = useDispatch()

    const institute_id = useSelector((state) => state.login.user.institute_id)
    const faculty_id = useSelector((state) => state.login.user.faculty_id)

    const [value, setValue] = useState(dayjs(new Date()));
    const [value1, setValue1] = useState(dayjs(new Date()));

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
        date: format(new Date(), 'MM/dd/yyyy'),
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(new Date(), 'HH:mm'),
    }
    )

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
            dispatch(addLeave(request))
            setLeaveModal(false)
            alert("Operation performed successfully!")
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
import React from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function AddLeave(props) {

    const { openLeaveModal, setLeaveModal } = props

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
                isOpen={openLeaveModal}
                onRequestClose={() => setLeaveModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Leave</h2>
                    <form>
                        <TextField
                            style={{ marginBottom: '1rem' }}
                            label="Reason"
                            defaultValue="Add text here..."
                            variant="outlined"
                            multiline={true}
                            rows={4} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={1.5}>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="DD/MM/YYYY"
                                    renderInput={(params) => <TextField {...params}
                                        variant="outlined" />} />
                                <TimePicker
                                    label="Start Time"
                                    renderInput={(params) => <TextField {...params}
                                        variant="outlined" />} />
                                <TimePicker
                                    label="End Time"
                                    renderInput={(params) => <TextField {...params}
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
import React from 'react'
import Modal from 'react-modal'
import Stack from '@mui/material/Stack';
import TextField from '@material-ui/core/TextField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function AddBreak1({breakModal1, setBreakModal1, breakIndex1, break1Time, setBreak1Time}) {

    const handleTimePickerChange = (index, field, value) => {
        setBreak1Time((prevTimeValues) => {
          const newTimeValues = [...prevTimeValues];
          newTimeValues[index] = { ...newTimeValues[index], [field]: value };
          return newTimeValues;
        });
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

    const handleForm1 = (e) => {
        e.preventDefault();
        setBreakModal1(false)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={breakModal1}
                onRequestClose={() => setBreakModal1(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Break-01</h2>
                    <form onSubmit={handleForm1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={1.5}>
                                <TimePicker
                                    label="Start time"
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                    variant="outlined" />}
                                    value={break1Time[breakIndex1]?.startTime || new Date()}
                                    onChange={(value) => handleTimePickerChange(breakIndex1, 'startTime', value)}/>
                                <TimePicker
                                    label="End time"
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                    variant="outlined" />} 
                                    value={break1Time[breakIndex1]?.endTime || new Date()}
                                    onChange={(value) => handleTimePickerChange(breakIndex1, 'endTime', value)}/>
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

export default AddBreak1
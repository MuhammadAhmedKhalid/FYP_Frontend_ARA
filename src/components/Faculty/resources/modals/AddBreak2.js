import React from 'react'
import Modal from 'react-modal'
import Stack from '@mui/material/Stack';
import TextField from '@material-ui/core/TextField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function AddBreak2({breakModal2, setBreakModal2, breakIndex2, break2Time, setBreak2Time}) {

    const handleTimePickerChange = (index, field, value) => {
        setBreak2Time((prevTimeValues) => {
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

  const handleForm2 = (e) => {
    e.preventDefault();
    setBreakModal2(false)
  }

  return (
    <div>
      <Modal
        className='modal-content'
        style={customStyles}
        isOpen={breakModal2}
        onRequestClose={() => setBreakModal2(false)}>
        <div className='center flexbox-container-y'>
            <h2 style={{ color: "#115868", fontSize: 20 }}>Add Break-02</h2>
            <form onSubmit={handleForm2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={1.5}>
                        <TimePicker
                            label="Start time"
                            renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                            variant="outlined" />}
                            value={break2Time[breakIndex2]?.startTime || null}
                            onChange={(value) => handleTimePickerChange(breakIndex2, 'startTime', value)}/>
                        <TimePicker
                            label="End time"
                            renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                            variant="outlined" />} 
                            value={break2Time[breakIndex2]?.endTime || null}
                            onChange={(value) => handleTimePickerChange(breakIndex2, 'endTime', value)}/>
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

export default AddBreak2
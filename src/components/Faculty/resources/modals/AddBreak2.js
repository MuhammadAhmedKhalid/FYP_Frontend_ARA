import React from 'react'
import Modal from 'react-modal'
import Stack from '@mui/material/Stack';
import TextField from '@material-ui/core/TextField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function AddBreak2({breakModal2, setBreakModal2}) {
  
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
                            />
                        <TimePicker
                            label="End time"
                            renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                            variant="outlined" />} 
                            />
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
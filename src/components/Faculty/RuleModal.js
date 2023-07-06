import React, { useState } from 'react'
import Modal from 'react-modal'
import '../Styling/Rule.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@material-ui/core/TextField'
import { format } from 'date-fns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function RuleModal({ruleModal, setRuleModal}) {

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

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [selectedItems, setSelectedItems] = useState([]);
    const [startDate, setStartDate] = useState(format(new Date(), 'MM/dd/yyyy'));
    const [endDate, setEndDate] = useState(format(new Date(), 'MM/dd/yyyy'));

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
    
        if (checked) {
          setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value]);
        } else {
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => item !== value)
          );
        }
    };

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    const handleStartDateChange = (newValue) => {
        const object = newValue
        let date;
        for (const key in object) {
            if (key === '$d') {
                date = format(new Date(object[key]), 'MM/dd/yyyy');
            }
        }
        setStartDate(date);
    }

    const handleEndDateChange = (newValue) => {
        const object = newValue
        let date;
        for (const key in object) {
            if (key === '$d') {
                date = format(new Date(object[key]), 'MM/dd/yyyy');
            }
        }
        setEndDate(date);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    if (selectedItems.length >= 5) {
        console.log('Form submitted successfully!');
        console.log('Selected items:', selectedItems);
        console.log('Start date:', startDate)
        console.log('End date:', endDate)
    } else {
        alert('Please select at least five days.');
    }
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={ruleModal}
                onRequestClose={() => setRuleModal(false)}>
                     <div className='center flexbox-container-y'>
                        <h2 style={{ color: "#115868", fontSize: 20, marginBottom: '1rem' }}>Schedule</h2>
                        <form onSubmit={handleSubmit} style={{padding: '0px'}}>
                            {
                                days.map((day, index) => 
                                <label className='label' key={index}>
                                    
                                    <input
                                        className='input'
                                        key={index}
                                        type="checkbox"
                                        value={day}
                                        checked={selectedItems.includes(day)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <a className='label-text'>{day}</a>
                                    <LocalizationProvider className='x-axis' dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            // value={value}
                                            // onChange={handleStartTimeChange}
                                            className="custom-timepicker"
                                            label="Availability Start"
                                            renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                            variant="outlined" />} />
                                        <TimePicker
                                            // value={value}
                                            // onChange={handleStartTimeChange}
                                            className="custom-timepicker"
                                            label="Availability End"
                                            renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                            variant="outlined" />} />
                                    </LocalizationProvider>
                                </label>
                                )
                            }
                            <h3 className='center' style={{margin: '20px', fontWeight: 'normal'}}>
                                -------- Applicable between --------
                            </h3>
                            <LocalizationProvider className='x-axis' dateAdapter={AdapterDayjs}>
                                <Stack spacing={1.5}>
                                    <DesktopDatePicker
                                        label="Start Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                            variant="outlined" />} />
                                    <DesktopDatePicker
                                        label="End Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                            variant="outlined" />} />
                                </Stack>
                            </LocalizationProvider>
                            <div className='center flexbox-container-y'>
                                <button className='modal-btn' style={{ marginTop: '1rem' }} type="submit">Save</button>
                            </div>
                        </form>
                     </div>
            </Modal>
        </div>
    )
}

export default RuleModal
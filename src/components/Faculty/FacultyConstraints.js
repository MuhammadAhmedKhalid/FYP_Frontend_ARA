import React, { useState } from 'react'
import FacultyNavbar from './FacultyNavbar'
import '../Styling/Constraints.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@material-ui/core/TextField'
import { format } from 'date-fns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function FacultyConstraints() {

    const [selectedItems, setSelectedItems] = useState([]);
    const [startDate, setStartDate] = useState(format(new Date(), 'MM/dd/yyyy'));
    const [endDate, setEndDate] = useState(format(new Date(), 'MM/dd/yyyy'));

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
        <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: 'fit-content',
                background: '#fff'
            }}>
                <div>
                    <FacultyNavbar/>
                    <h2 className='center' style={{ color: "#115868", fontSize: 30, marginTop: '5rem', marginBottom: '1.5rem' }}>
                        Constraints
                    </h2>
                    <form onSubmit={handleSubmit} style={{padding: '0px'}}>
                    {
                        days.map((day, index) => 
                        <label style={{justifyContent: 'left'}} className='label x-axis' key={index}>
                            <input
                                className='input'
                                key={index}
                                type="checkbox"
                                value={day}
                                checked={selectedItems.includes(day)}
                                onChange={handleCheckboxChange}
                            />
                            <a className='label-text'>{day}</a>
                            <div className='x-axis'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    // value={value}
                                    // onChange={handleStartTimeChange}
                                    className="custom-timepicker"
                                    label="Availability Start"
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                    variant="outlined" />} />
                                <p>...</p>
                                <TimePicker
                                    // value={value}
                                    // onChange={handleStartTimeChange}
                                    className="custom-timepicker"
                                    label="Availability End"
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                    variant="outlined" />} />
                            </LocalizationProvider>
                            </div>
                        </label>
                        )
                    }
                    <h3 className='center' style={{margin: '20px', fontWeight: 'normal'}}>
                        -------- Applicable between --------
                    </h3>
                    <div className='x-axis'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="DD/MM/YYYY"
                                value={startDate}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                variant="outlined" />} />
                            <p>...</p>
                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="DD/MM/YYYY"
                                value={endDate}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                variant="outlined" />} />
                        </LocalizationProvider>
                    </div>
                    <div className='center flexbox-container-y'>
                        <button className='modal-btn' style={{margin: '1.85rem'}}  type="submit">Save</button>
                    </div>
                    </form>
                </div>
        </div>
    )
}

export default FacultyConstraints
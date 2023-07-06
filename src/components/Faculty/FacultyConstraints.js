import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import '../Styling/Constraints.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@material-ui/core/TextField'
import { format } from 'date-fns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddBreak1 from './resources/modals/AddBreak1';
import AddBreak2 from './resources/modals/AddBreak2';

function FacultyConstraints() {

    const [selectedItems, setSelectedItems] = useState([]);
    const [timeValues, setTimeValues] = useState([]);
    const [startDate, setStartDate] = useState(format(new Date(), 'MM/dd/yyyy'));
    const [endDate, setEndDate] = useState(format(new Date(), 'MM/dd/yyyy'));
    const [breakModal1, setBreakModal1] = useState(false);
    const [breakModal2, setBreakModal2] = useState(false);
    const [breakIndex1, setBreakIndex1] = useState();
    const [breakIndex2, setBreakIndex2] = useState();
    const [break1Time, setBreak1Time] = useState([]);
    const [break2Time, setBreak2Time] = useState([]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const initialTimeValues = days.map((day) => ({
          day,
          startTime: new Date(), 
          endTime: new Date(), 
        }));
        setTimeValues(initialTimeValues);
        setBreak1Time(initialTimeValues);
        setBreak2Time(initialTimeValues);
      }, []);

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

    const handleTimePickerChange = (index, field, value) => {
        setTimeValues((prevTimeValues) => {
          const newTimeValues = [...prevTimeValues];
          newTimeValues[index] = { ...newTimeValues[index], [field]: value };
          return newTimeValues;
        });
    };

    const handleBreak1 = (index) => {
        setBreakIndex1(index)
        setBreakModal1(true)
    }

    const handleBreak2 = (index) => {
        setBreakIndex2(index)
        setBreakModal2(true)
    }

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
            console.log('Time values:', timeValues)
            console.log("Break-01 times:", break1Time)
            console.log("Break-02 times:", break2Time)
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
                    <div key={index}>
                        <div className='flexbox-container' style={{justifyContent: 'left'}}>
                            <input
                                className='input'
                                type="checkbox"
                                value={day}
                                checked={selectedItems.includes(day)}
                                onChange={handleCheckboxChange}
                            />
                            <a className='label-text'>{day}</a>
                        </div>
                        <label style={{ marginBottom: '10px'}} className='label x-axis' >
                            <div className='x-axis'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        className="custom-timepicker"
                                        label="Availability Start"
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                        variant="outlined" />}
                                        value={timeValues[index]?.startTime || new Date()}
                                        onChange={(value) => handleTimePickerChange(index, 'startTime', value)} />
                                    <p>...</p>
                                    <TimePicker
                                        className="custom-timepicker"
                                        label="Availability End"
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                        variant="outlined" />} 
                                        value={timeValues[index]?.endTime || new Date()}
                                        onChange={(value) => handleTimePickerChange(index, 'endTime', value)}/>
                                </LocalizationProvider>
                                <p className='break-btn' onClick={() => handleBreak1(index)}>+ Add Break</p>
                                <p className='break-btn' onClick={() => handleBreak2(index)}>+ Add Break</p>
                            </div>
                        </label>
                    </div>
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
            {breakModal1 && <AddBreak1 breakModal1={breakModal1} setBreakModal1={setBreakModal1} breakIndex1={breakIndex1}
                break1Time={break1Time} setBreak1Time={setBreak1Time}/>}
            {breakModal2 && <AddBreak2 breakModal2={breakModal2} setBreakModal2={setBreakModal2} breakIndex2={breakIndex2}
                break2Time={break2Time} setBreak2Time={setBreak2Time}/>}
        </div>
    )
}

export default FacultyConstraints
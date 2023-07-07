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
import { useDispatch } from 'react-redux'
import { addFacultyConstraintsRequest } from '../../redux/AddFacultyConstraints/addFacultyConstraintsActions'
import { addRequestedStaff } from '../../redux/AddStaffRequest/staffRequestActions'

function FacultyConstraints() {

    const dispatch = useDispatch()

    const institute_id = Number(localStorage.getItem('institute_id'))
    const faculty_id = Number(localStorage.getItem('faculty_id'))
    const user_id = Number(localStorage.getItem('user_id'))

    const [request, setRequest] = useState({
        institute_id,
        faculty_id,
        user_id,
        availability: {
            monday: { startTime: null, endTime: null },
            tuesday: { startTime: null, endTime: null },
            wednesday: { startTime: null, endTime: null },
            thursday: { startTime: null, endTime: null },
            friday: { startTime: null, endTime: null },
            saturday: { startTime: null, endTime: null },
        },
        breaks: {
            monday: {break1: { startTime: null, endTime: null }, break2: { startTime: null, endTime: null }},
            tuesday: {break1: { startTime: null, endTime: null }, break2: { startTime: null, endTime: null }},
            wednesday: {break1: { startTime: null, endTime: null }, break2: { startTime: null, endTime: null }},
            thursday: {break1: { startTime: null, endTime: null }, break2: { startTime: null, endTime: null }},
            friday: {break1: { startTime: null, endTime: null }, break2: { startTime: null, endTime: null }},
            saturday: {break1: { startTime: null, endTime: null }, break2: { startTime: null, endTime: null }},
        },
        applicableStartDate: new Date(),
        applicableEndDate: new Date()
    })

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
    const [dispatchAction, setDispatch] = useState(false);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const initialTimeValues = days.map((day) => ({
          day,
          startTime: null, 
          endTime: null, 
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
        
        let canSubmit = true;
        const dayMapping = {
            Monday: 'monday',
            Tuesday: 'tuesday',
            Wednesday: 'wednesday',
            Thursday: 'thursday',
            Friday: 'friday',
            Saturday: 'saturday',
        };

        for(let i of selectedItems){
            for(let j of timeValues){
                if(i === j.day && (j.startTime === null || j.endTime === null)){
                    canSubmit=false
                }
            }
        }

        if (selectedItems.length >= 5 && canSubmit) {

            for (let i of break1Time) {
                for (let j of selectedItems) {
                  const day = j;
                  if (i.day === day && i.startTime !== null && i.endTime !== null) {
                    const object1 = i.startTime;
                    for (const key in object1) {
                      if (key === '$d') {
                        setRequest((prevState) => ({ ...prevState, breaks: 
                            { ...prevState.breaks, [dayMapping[day]]: 
                                { ...prevState.breaks[dayMapping[day]], break1: 
                                    { ...prevState.breaks[dayMapping[day]].break1, startTime: format(new Date(i.startTime), 'HH:mm')}}
                          }
                        }));
                      }
                    }
              
                    const object2 = i.endTime;
                    for (const key in object2) {
                      if (key === '$d') {
                        setRequest((prevState) => ({ ...prevState, breaks: 
                            { ...prevState.breaks, [dayMapping[day]]: 
                                { ...prevState.breaks[dayMapping[day]], break1: 
                                    {...prevState.breaks[dayMapping[day]].break1, endTime: format(new Date(i.endTime), 'HH:mm')}}
                          }
                        }));
                      }
                    }
                  }
                }
            }

            for (let i of break2Time) {
                for (let j of selectedItems) {
                  const day = j;
                  if (i.day === day && i.startTime !== null && i.endTime !== null) {
                    const object1 = i.startTime;
                    for (const key in object1) {
                      if (key === '$d') {
                        setRequest((prevState) => ({ ...prevState, breaks: 
                            { ...prevState.breaks, [dayMapping[day]]: 
                                { ...prevState.breaks[dayMapping[day]], break2: 
                                    { ...prevState.breaks[dayMapping[day]].break2, startTime: format(new Date(i.startTime), 'HH:mm')}}
                          }
                        }));
                      }
                    }
              
                    const object2 = i.endTime;
                    for (const key in object2) {
                      if (key === '$d') {
                        setRequest((prevState) => ({ ...prevState, breaks: 
                            { ...prevState.breaks, [dayMapping[day]]: 
                                { ...prevState.breaks[dayMapping[day]], break2: 
                                    {...prevState.breaks[dayMapping[day]].break2, endTime: format(new Date(i.endTime), 'HH:mm')}}
                          }
                        }));
                      }
                    }
                  }
                }
            }

            setRequest(prevRequest => ({
                ...prevRequest,
                applicableStartDate: startDate,
                applicableEndDate: endDate
            }));

            for (const i of timeValues) {
                const day = i.day;
                const dayProperty = dayMapping[day];
                
                for(let j of selectedItems){
                    if(day === j){
                        const object1 = i.startTime;
                        for (const key in object1) {
                            if (key === '$d') {
                            setRequest(prevRequest => ({ ...prevRequest, availability: 
                                { ...prevRequest.availability, [dayProperty]: 
                                    { ...prevRequest.availability[dayProperty], startTime: format(new Date(i.startTime), 'HH:mm')}}
                            }));
                            }
                        }
                        
                        const object2 = i.endTime;
                        for (const key in object2) {
                            if (key === '$d') {
                            setRequest(prevRequest => ({ ...prevRequest, availability: 
                                { ...prevRequest.availability, [dayProperty]: 
                                    { ...prevRequest.availability[dayProperty], endTime: format(new Date(i.endTime), 'HH:mm')}}
                            }));
                            }
                        }
                    }
                }
            }
            setDispatch(true)
        } else {
            alert('Please select at least five days and select available time for the selected days.');
        }
    }

    function getDateAndDayOfWeek(startDate, endDate) {
        const dates = [];
        const current = new Date(startDate);
      
        while (current <= new Date(endDate)) {
          if (current.getDay() !== 0) { 
            const date = new Date(current);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            dates.push([date, dayOfWeek]);
          }
          current.setDate(current.getDate() + 1);
        }
      
        return dates;
      }

      function getNonWorkingTime(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
      
        const nonWorkingStart = new Date(end.getTime() + 1 * 60 * 1000); 
        const nonWorkingEnd = new Date(start.getTime() - 1 * 60 * 1000); 
      
        if (nonWorkingStart > nonWorkingEnd) {
          nonWorkingEnd.setDate(nonWorkingEnd.getDate() + 1);
        }
      
        return [format(new Date(nonWorkingStart), 'HH:mm'), format(new Date(nonWorkingEnd), 'HH:mm')];
      }

    if(dispatchAction){
        setDispatch(false)
        dispatch(addFacultyConstraintsRequest(request))

        const nestedLists = getDateAndDayOfWeek(startDate, endDate);

        for(let i of timeValues){
            for(let j of nestedLists){
                if(i.day === j[1] && i.startTime !== null && i.endTime !== null){
                    const nonWorkingTime = getNonWorkingTime(format(new Date(i.startTime), 'HH:mm'), format(new Date(i.endTime), 'HH:mm'));
                    dispatch(addRequestedStaff({
                        institute_id,
                        user_id,
                        startTime: nonWorkingTime[0],
                        endTime: nonWorkingTime[1],
                        date: format(new Date(j[0]), 'MM/dd/yyyy')
                    }))
                }
            }
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
                                        value={timeValues[index]?.startTime || null}
                                        onChange={(value) => handleTimePickerChange(index, 'startTime', value)} />
                                    <p>...</p>
                                    <TimePicker
                                        className="custom-timepicker"
                                        label="Availability End"
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}
                                        variant="outlined" />} 
                                        value={timeValues[index]?.endTime || null}
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
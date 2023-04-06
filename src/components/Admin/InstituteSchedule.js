import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../Styling/InstituteSchedule.css'
 
function InstituteSchedule() {

  const localizer = momentLocalizer(moment)

  const options = ["Spring", "Fall"];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  

  return (
    <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div><AdminNavbar/></div>
            <form>
              <div style={{ marginTop: '50px', marginBottom: '0px' }} className='flexbox-container-y'>
              <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>Choose Batch</h3>
                <select className='dropdown'>
                  <option/>
                  <option>2019-SE</option>
                  <option>2020-SE</option>
                  <option>2019-EE</option>
                </select>
              </div>
            </form>
            <div className="options-wrapper" style={{ marginBottom: '30px' }}>
              <div className="options-container">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${selectedOption === option ? "selected" : ""}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <Calendar
                style={{ height: 500, margin: "100px", marginTop: "0px" }}
                messages={{ today: 'Current' }}
                localizer={localizer}
                startAccessor="startDate"
                endAccessor="endDate"
            />
        </div>
  )
}

export default InstituteSchedule
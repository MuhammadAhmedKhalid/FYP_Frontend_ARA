import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
 
function InstituteSchedule() {

  const localizer = momentLocalizer(moment)

  return (
    <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div><AdminNavbar/></div>
            <Calendar
                style={{ height: 600, margin: "100px" }}
                messages={{ today: 'Current' }}
                localizer={localizer}
                startAccessor="startDate"
                endAccessor="endDate"
            />
        </div>
  )
}

export default InstituteSchedule
import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import { format } from 'date-fns';

function Schedule() {

    const localizer = momentLocalizer(moment)

    return (
        <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div><FacultyNavbar /></div>
            <Calendar
                style={{ height: 600, margin: "100px" }}
                messages={{ today: 'Current' }}
                localizer={localizer}
                // events={events}
                // views={['month']}
                startAccessor="startDate"
                endAccessor="endDate"
                selectable
                // onSelectEvent={

                // event => showDetails(event)
                // }
                // onSelectSlot={
                // slotInfo => change(slotInfo)
                // }
            />
        </div>
    )
}

export default Schedule
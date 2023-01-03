import React from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'

const localizer = momentLocalizer(moment)

function FullCalendar(props) {
    const { style, messages, views, defaultView } = props
    return (
        <div>
            <Calendar
                style={style}
                messages={messages}
                views={views}
                localizer={localizer}
                selectable
                defaultView={defaultView}
            />
        </div>
    )
}

export default FullCalendar
import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { assignedCoursesRequest } from '../../redux/AssignedCourses/assignedCoursesActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'
import ShowEventDetials from './resources/modals/ShowEventDetials';

function Schedule() {

    const localizer = momentLocalizer(moment)
    const dispatch = useDispatch()

    const [events, setEvents] = useState([])
    const [details, setDetails] = useState()
    const [showDetailModal, setShowDetailModal] = useState(false)

    const institute_id = useSelector((state) => state.login.user.institute_id)
    const assignedCourses = useSelector((state) => state.assignedCoursesReducer.assignedCourses.data)
    const assignedCoursesAdded = useSelector((state) => state.assignedCoursesReducer.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursessAdded = useSelector((state) => state.getCourseReducer.added)

    useEffect(() => {
        if(institute_id){
            dispatch(assignedCoursesRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
        }
    }, [])

    useEffect(() => {
        if(assignedCoursesAdded && coursessAdded && assignedCourses.length > 0 && courses.length > 0){
            setEvents([])
            for(let i of assignedCourses){
                for(let j of courses){
                    if(j.course_id == i.course_id){
                        setEvents(events => [...events, 
                            {title: j.course_name, startDate: new Date(i.date + " " +i.startTime), endDate: new Date(i.date + " " +i.endTime)}])
                    }
                    break
                }
            }
        }
    }, [assignedCourses, courses])

    const showDetails = (details) => {
        setDetails(details)
        setShowDetailModal(true)
    }
    
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
                events={events}
                startAccessor="startDate"
                endAccessor="endDate"
                onSelectEvent={event => showDetails(event)}
            />
            <div>
                <ShowEventDetials details={details} showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal}/>
            </div>
        </div>
    )
}

export default Schedule
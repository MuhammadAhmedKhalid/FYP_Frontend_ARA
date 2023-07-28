import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import FullCalendar from '../Root/FullCalendar'
import '../Styling/HomeScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import RequestedData from '../Root/RequestedData'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'
import { getOfferedCourses } from '../../redux/GetOfferedCourses/getOfferedCoursesActions'
import { getAllocatedFaculty } from '../../redux/GetAllocatedFaculty/allocatedFacultyActions'

function FacultyHomeScreen() {

    const dispatch = useDispatch()

    const institute_id = Number(localStorage.getItem('institute_id'))
    const faculty_id = Number(localStorage.getItem('faculty_id'))
    const facultyName = localStorage.getItem('name')
    const instituteName = localStorage.getItem('institute_name')

    const [greetings, setGreetings] = useState("")
    const [coursesList, setCoursesList] = useState([])

    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursesAdded = useSelector((state) => state.getCourseReducer.added)
    const offeredCourses = useSelector((state) => state.offeredCoursesReducer.offeredCourses.data)
    const offeredCoursesAdded = useSelector((state) => state.offeredCoursesReducer.added)
    const allocatedFaculty = useSelector((state) => state.allocatedFacultyReducer.allocatedFaculty.data)
    const allocatedFacultyAdded = useSelector((state) => state.allocatedFacultyReducer.added)

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getCourseRequest(institute_id))
            dispatch(getOfferedCourses(institute_id))
            dispatch(getAllocatedFaculty(institute_id))
        }
    }, [institute_id])

    useEffect(() => {
        if(coursesAdded && offeredCoursesAdded && allocatedFacultyAdded){
            for(let i of offeredCourses){
                for(let j of allocatedFaculty){
                    if(i.offerCourseId === j.offerCourseId && j.faculty_id === faculty_id && i.allocated && i.addedInTimetable){
                        for(let k of courses){
                            if(i.course_id === k.course_id){
                                coursesList.push(k.course_name)
                            }
                        }
                    }
                }
            }
        }
    }, [coursesAdded, offeredCoursesAdded, allocatedFacultyAdded])

    useEffect(() => {
        let date = new Date();
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).split(":")
        const setMessage = () => {
            if (time[0] >= 5 && time[0] <= 11) {
                setGreetings("Morning")
            } else if (time[0] >= 12 && time[0] <= 16) {
                setGreetings("Afternoon")
            } else if (time[0] >= 17 && time[0] <= 20) {
                setGreetings("Evening")
            } else {
                setGreetings("Night")
            }
        }
        setMessage()
    }, [])

    const isMobile = window.innerWidth <= 1040;

    return (
        <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div>
                <FacultyNavbar />
                <div style={{ marginTop: '60px', padding: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: 'normal' }}>Good {greetings}</h2>
                        <div className='flexbox-container'>
                            {
                                <h2 style={{ color: '#0E5E6F' }}>{instituteName}!</h2>
                            }
                        </div>
                    </div><h1 style={{ color: '#0E5E6F' }}>{facultyName}!</h1>
                </div>
                <div className='flexbox-container' style={{ justifyContent: 'space-between' }}>
                    <div className="gradient" style={{
                        width: coursesList.length === 0 ? 325 : 450,  
                        maxHeight: coursesList.length === 0 ? 85 : 232,  
                        backgroundColor: '#0E5E6F',
                        borderRadius: 15,
                        margin: '15px',
                        overflow: coursesList.length > 4 ? 'auto' : 'hidden',
                    }}>
                        <div style={{ margin: '25px' }}>
                            <h2 style={{ fontWeight: 'normal' }}>Total Assigned Courses: <b>{coursesList.length}</b></h2><br />
                            {
                                coursesList.map((course, index) => 
                                <p key={index} style={{ fontWeight: 'normal', color: 'black', fontSize: '17px' }}>{index+1}. {course}</p>
                                )
                            }
                        </div>
                    </div>
                    {
                        isMobile ? null : <div style={{ justifyContent: 'flex-end' }}>
                        <FullCalendar
                            messages={{ next: '>', previous: '<', today: 'Current' }}
                            views={['week', 'day']}
                            style={{ height: 280, width: 700, padding: '15px' }}
                            defaultView="week"
                        />
                    </div>
                    }
                </div>
                
                {isMobile ? 
                <div style={{ justifyContent: 'flex-end' }}>
                    <FullCalendar
                        messages={{ next: '>', previous: '<', today: 'Current' }}
                        views={['month']}
                        style={{ height: 280, width: 350, padding: '15px' }}
                    />
                </div> 
                : <RequestedData/>}
            </div>
        </div>
    )
}

export default FacultyHomeScreen
import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import FullCalendar from '../Root/FullCalendar'
import '../Styling/HomeScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import RequestedData from '../Root/RequestedData'
import { assignedCoursesForTableRequest } from '../../redux/AssignedCoursesForTable/assignedCoursesForTableActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'

function FacultyHomeScreen() {

    const dispatch = useDispatch()

    const institute_id = localStorage.getItem('institute_id')
    const faculty_id = Number(localStorage.getItem('faculty_id'))
    const assignedCourses = useSelector((state) => state.assignedCoursesForTableReducer.assignedCourses.data)
    const assignedCoursesAdded = useSelector((state) => state.assignedCoursesForTableReducer.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const coursesAdded = useSelector((state) => state.getCourseReducer.added)
    const [coursesList, setCoursesList] = useState([])

    useEffect(() => {
        if(institute_id > 0){
          dispatch(assignedCoursesForTableRequest(institute_id))
          dispatch(getCourseRequest(institute_id))
        }
      }, [institute_id])

    useEffect(() => {
        if(assignedCoursesAdded && coursesAdded){
            for(let i of assignedCourses){
                for(let j of courses){
                    if(i.facultyId === faculty_id && j.course_id === i.courseId){
                        if(coursesList.length !== 0){
                            for(let k of coursesList){
                                if(k === j.course_name){
                                    coursesList.splice(coursesList.indexOf(k) , 1)
                                }
                            }
                        }
                        coursesList.push(j.course_name)
                    }
                }
            }
        }
    }, [assignedCoursesAdded, coursesAdded])

    const [greetings, setGreetings] = useState("")

    const facultyName = localStorage.getItem('name')

    const instituteName = localStorage.getItem('institute_name')

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
                        height: coursesList.length === 0 ? 85 : 232,  
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
                    <div style={{ justifyContent: 'flex-end' }}>
                        <FullCalendar
                            messages={{ next: '>', previous: '<', today: 'Current' }}
                            views={['week', 'day']}
                            style={{ height: 280, width: 700, padding: '15px' }}
                            defaultView="week"
                        />
                    </div>
                </div>
                <RequestedData/>
            </div>
        </div>
    )
}

export default FacultyHomeScreen
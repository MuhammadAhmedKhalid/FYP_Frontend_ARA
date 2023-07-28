import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../Styling/InstituteSchedule.css'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchesRequest } from '../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import { assignedCoursesRequest } from '../../redux/AssignedCourses/assignedCoursesActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'
import ShowEventDetails from '../Root/ShowEventDetials' 
 
function InstituteSchedule() {

  const dispatch = useDispatch()

  const institute_id = Number(localStorage.getItem('institute_id'))
  const batches = useSelector((state) => state.getBatchesReducer.batches.data)
  const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
  const departments = useSelector((state) => state.getDepartments.departments.data)
  const departmentsAdded = useSelector((state) => state.getDepartments.added)
  const assignedCourses = useSelector((state) => state.assignedCoursesReducer.assignedCourses.data)
  const assignedCoursesAdded = useSelector((state) => state.assignedCoursesReducer.added)
  const courses = useSelector((state) => state.getCourseReducer.courses)
  const coursessAdded = useSelector((state) => state.getCourseReducer.added)
  const faculty = useSelector((state) => state.getFaculty.faculty)
  const facultyAdded = useSelector((state) => state.getFaculty.added)

  const localizer = momentLocalizer(moment)
  
  const [events, setEvents] = useState([])
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [details, setDetails] = useState()

  const [batchesData, setBatchesData] = useState([])
  const [department_id, setDepartmentId] = useState()
  const [batchId, setBatchId] = useState()

  useEffect(() => {
    dispatch(getBatchesRequest(institute_id))
    dispatch(getDepartmentsRequest(institute_id))
    dispatch(assignedCoursesRequest(institute_id))
    dispatch(getCourseRequest(institute_id))
    dispatch(getFacultyRequest(institute_id))
  }, [dispatch, institute_id])

  useEffect(() => {
    if(batchId > 0 && department_id > 0 && assignedCoursesAdded && coursessAdded && facultyAdded 
        && assignedCourses.length > 0 && courses.length > 0 && faculty.length > 0 ){
          setEvents([])
          for(let i of assignedCourses){
            for(let j of courses){
              for(let k of faculty){
                if(j.course_id === i.course_id && i.batchId === batchId && i.department_id === department_id 
                  && k.faculty_id === i.faculty_id){
                    setEvents(events => [...events, 
                        {
                          id: i.assignedCourseId, 
                          title: j.course_name + " (" + k.name + ")", 
                          startDate: new Date(i.date + " " +i.startTime), 
                          endDate: new Date(i.date + " " +i.endTime)
                        }
                      ])
                    break
                  }
              }
            }
          }
    }
  }, [batchId, department_id])

  useEffect(() => {
    if(batchesAdded && departmentsAdded && department_id > 0){
        setBatchesData([])
        for(let i in batches){
            for(let j in departments){
                if(batches[i].department_id === departments[j].department_id && departments[j].department_id == department_id){
                    setBatchesData(batchesData => [...batchesData, {batchId: batches[i].batchId, 
                        name: `${batches[i].batchCode} - ${batches[i].section}`, 
                      department_id: departments[j].department_id}])
                }
            }
        }
    }
}, [department_id])

  const handleDepartmentChange = (event) => {
    const department_name = event.target.value
    for (let i = 0; i < departments.length; i++) {
        if (departments[i].department_name === department_name) {
            setDepartmentId(departments[i].department_id)
            break
        }
    }
}

const handleBatchChange = (e) => {
    for(let i of batchesData){
        if(i.name === e.target.value){
            setBatchId(i.batchId)
            break
        }
    }
}

  const showDetails = (details) => {
    for(let i of assignedCourses){
        if(i.assignedCourseId === details.id){
            setDetails(i)
        }
    }
    setShowDetailModal(true)
}

const isMobile = window.innerWidth <= 1040;

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
              <h3 style={{
                  fontWeight: 'normal', color: 'gray', marginRight: '3px'
              }}>Department</h3>
              <select required className='dropdown' onChange={handleDepartmentChange}>
                  <option></option>
                  {
                      departmentsAdded && departments.length !== 0 ? departments.map(department =>
                          <option key={department.department_id}>{department.department_name}</option>) : null
                  }
              </select>
              <h3 style={{
                  fontWeight: 'normal', color: 'gray', marginRight: '3px'
              }}>Batch</h3>
              <select required className='dropdown' onChange={handleBatchChange}>
              <option></option>
                  {
                      batchesData.length !== 0 ? batchesData.map(batch => 
                          <option key={batch.batchId}>{batch.name}</option>) : null
                  }
              </select>
              </div>
            </form>
            <Calendar
                style={{ height: isMobile ? 1000 : 500, 
                  margin: "100px", 
                  marginTop: "0px",
                  marginRight: isMobile ? '0px' : '100px', 
                  marginLeft: isMobile ? '0px' : '100px', 
                  width : isMobile ? 375 : null,
              }}
                views={isMobile ? ['month'] : ['month', 'agenda', 'day', 'week']}
                messages={{ today: 'Current' }}
                localizer={localizer}
                startAccessor="startDate"
                endAccessor="endDate"
                events={events}
                onSelectEvent={event => showDetails(event)}
            />
            <div>
                <ShowEventDetails details={details} showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal}/>
            </div>
        </div>
  )
}

export default InstituteSchedule
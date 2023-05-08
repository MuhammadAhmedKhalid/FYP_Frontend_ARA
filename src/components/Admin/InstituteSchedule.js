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

  const institute_id = localStorage.getItem('institute_id')
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

  const options = ["Spring", "Fall"];

  const [selectedSemesterType, setselectedSemesterType] = useState(options[0]);
  const [semesterTypeChange, setSemesterTypeChange] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState("")
  const [batchData, setBatchData] = useState([])
  const [events, setEvents] = useState([])
  const [batchId, setBatchId] = useState(0)
  const [departmentId, setDepartmentId] = useState(0)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [details, setDetails] = useState()

  useEffect(() => {
    dispatch(getBatchesRequest(institute_id))
    dispatch(getDepartmentsRequest(institute_id))
    dispatch(assignedCoursesRequest(institute_id))
    dispatch(getCourseRequest(institute_id))
    dispatch(getFacultyRequest(institute_id))
  }, [dispatch, institute_id])

  useEffect(() => {
    if(assignedCoursesAdded && coursessAdded && facultyAdded && assignedCourses.length > 0 && courses.length > 0 && faculty.length > 0 &&batchId > 0 && departmentId > 0){
        setEvents([])
        for(let i of assignedCourses){
            for(let j of courses){
                for(let k of faculty){
                  if(j.course_id === i.course_id && i.batchId === batchId && i.department_id === departmentId && i.semesterType === selectedSemesterType && k.faculty_id === i.faculty_id){
                    setEvents(events => [...events, 
                        {id: i.assignedCourseId, title: j.course_name + " (" + k.name + ")", startDate: new Date(i.date + " " +i.startTime), endDate: new Date(i.date + " " +i.endTime)}])
                        break
                }
                }
            }
        }
    }
  }, [assignedCourses, courses, batchId, departmentId, selectedSemesterType, faculty])

  useEffect(() => {
    if(batchesAdded && departmentsAdded){
      setBatchData([])
      for(let i of batches){
        for(let j of departments){
          if(i.department_id === j.department_id){
            setBatchData(batchData => [...batchData, [i.batchYear, j.department_name]])
          }
        }
      }
    }
  }, [batchesAdded, departmentsAdded])

  useEffect(() => {
    if(selectedBatch.length > 0){
      let selectedData = selectedBatch.split(" - ");
      for(let i of batches){
        for(let j of departments){
          if(i.batchYear == selectedData[0] && selectedData[1] === j.department_name && i.department_id === j.department_id){
            setBatchId(i.batchId)
            setDepartmentId(j.department_id)
            break
          }
        }
      }
    }
  }, [semesterTypeChange, selectedBatch])

  const handleOptionClick = (option) => {
    setselectedSemesterType(option);
    setSemesterTypeChange(!semesterTypeChange)
  };

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value)
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
              <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>Choose Batch</h3>
                <select className='dropdown' onChange={handleBatchChange}>
                  <option/>
                  {
                    batchData.length !== 0 ? batchData.map((batch, index) => 
                      <option key={index}>{batch.join(' - ')}</option>
                      ) : null
                  }
                </select>
              </div>
            </form>
            <div className="options-wrapper" style={{ marginBottom: '30px' }}>
              <div className="options-container">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${selectedSemesterType === option ? "selected" : ""}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <Calendar
                // style={{ height: 500, margin: "100px", marginTop: "0px" }}
                style={{ height: isMobile ? 1000 : 500, 
                  margin: "100px", 
                  marginTop: "0px",
                  marginRight: isMobile ? '0px' : '100px', 
                  marginLeft: isMobile ? '0px' : '100px', 
                  width : isMobile ? 360 : null,
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
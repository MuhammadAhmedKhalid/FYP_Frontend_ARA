import React, { useState, useEffect } from 'react'
import '../Styling/NavbarStyles.css'
import { BsCheckCircle } from "react-icons/bs";
import { updateAssignedCourse } from '../../redux/UpdateAssignedCourse/updateAssignedCourseActions'
import { updateWeightage } from '../../redux/UpdateWeightage/updateWeightageActions'
import { addNotificationRequest } from '../../redux/AddNotification/addNotificationActions'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchesRequest } from '../../redux/GetBatches/getBatchesActions' 
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'

function CheckIcon(props) {

  const {facultyId, assignedCourse, weightageId, setRefresh} = props

  const dispatch = useDispatch()

  const institute_id = useSelector((state) => state.login.user.institute_id)
  const departments = useSelector((state) => state.getDepartments.departments.data)
  const faculty = useSelector((state) => state.getFaculty.faculty)
  const batches = useSelector((state) => state.getBatchesReducer.batches.data)
  const courses = useSelector((state) => state.getCourseReducer.courses)

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if(institute_id > 0){
        dispatch(getDepartmentsRequest(institute_id))
        dispatch(getFacultyRequest(institute_id))
        dispatch(getBatchesRequest(institute_id))
        dispatch(getCourseRequest(institute_id))
    }
  },[institute_id, dispatch])
  
  const selectFaculty = () => {
    setRefresh(true)
    dispatch(updateWeightage(weightageId))
    dispatch(updateAssignedCourse(assignedCourse, facultyId))

    let courseName;
    let batch;
    let department;
    let replacedFacultyDepartment;
    let replacedFacultyName;
    let facultyName;
    let userId;

    for(let i of courses){
      if(i.course_id === assignedCourse.course_id){
        courseName = i.course_name
        break
      }
    }

    for(let i of batches){
      if(assignedCourse.batchId === i.batchId){
        batch = i.batchYear
        break
      }
    }
    for(let j of departments){
      if(assignedCourse.department_id === j.department_id){
        department = j.department_name
        break
      }
    }

    for(let o of departments){

      for(let p of faculty){
          if(p.faculty_id == assignedCourse.faculty_id){
            facultyName = p.name
          }
          if(p.faculty_id == facultyId){
              replacedFacultyName = p.name
          }
          if(p.department == o.department_name && p.faculty_id == facultyId){
              replacedFacultyDepartment = p.department
              userId = p.user.user_id
          }
      }
      
  }

    notifications.push({title: replacedFacultyName + " (" + replacedFacultyDepartment + ")" + " replaced " 
      + facultyName + " for " + courseName + " (" + batch + "-" + department + ").", 
        date: assignedCourse.date, 
        details: "", 
        department_id: assignedCourse.department_id,
        institute_id,
        user_id: userId    
    })

    dispatch(addNotificationRequest(notifications))

  }

  return (
    <div className='inline'>
        <div className="checked-icon-container inline">
            <BsCheckCircle size="1.5em" style={{marginRight: '5px', marginLeft: '5px'}} onClick={selectFaculty}/>
        </div>
    </div>
  )
}

export default CheckIcon
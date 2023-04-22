import React from 'react'
import '../Styling/NavbarStyles.css'
import { BsCheckCircle } from "react-icons/bs";
import { updateAssignedCourse } from '../../redux/UpdateAssignedCourse/updateAssignedCourseActions'
import { updateWeightage } from '../../redux/UpdateWeightage/updateWeightageActions'
import { useSelector, useDispatch } from 'react-redux'
// import { BsXCircle } from "react-icons/bs";

function CheckUnCheckIcon(props) {

  const {facultyId, assignedCourse, weightageId} = props

  const dispatch = useDispatch()
  
  const selectFaculty = () => {
    dispatch(updateWeightage(weightageId))
    dispatch(updateAssignedCourse(assignedCourse, facultyId))
  }

  return (
    <div className='inline'>
        <div className="checked-icon-container inline">
            <BsCheckCircle size="1.5em" style={{marginRight: '5px', marginLeft: '5px'}} onClick={selectFaculty}/>
        </div>
        {/* <div className="unchecked-icon-container inline">
            <BsXCircle size="1.5em"/>
        </div> */}
    </div>
  )
}

export default CheckUnCheckIcon
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import GradeIcon from '@mui/icons-material/Grade';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../../../redux/GetCourse/getCourseActions'
import { updateCourse } from '../../../../../redux/UpdateCourse/updateCourseActions'

function UpdCourse({update, setUpdate, data}) {

  const dispatch = useDispatch()

  const departments = useSelector((state) => state.getDepartments.departments.data)
  const departmentsAdded = useSelector((state) => state.getDepartments.added)
  const courses = useSelector((state) => state.getCourseReducer.courses)
  
  const institute_id = localStorage.getItem('institute_id')

  const [course, setCourse] = useState({
    course_name: data[1],
    department_id: "",
    course_code: data[3],
    credit_hours: data[4],
    type: data[5],
    institute_id
  })

  useEffect(()=>{
    if(institute_id > 0){
        dispatch(getDepartmentsRequest(institute_id))
        dispatch(getCourseRequest(institute_id))
    }
  }, [institute_id])

  const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, .7)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
  };

  const handleDepartmentChange = (event) => {
    const department_name = event.target.value
    for (let i = 0; i < departments.length; i++) {
        if (departments[i].department_name === department_name) {
            setCourse({ ...course, department_id: departments[i].department_id })
        }
    }
  }

  const handleTypeChange = (e) => {
    setCourse({ ...course, type: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    for(let i of courses){
        if(i.course_id === data[0]){
          dispatch(updateCourse(i.course_id, course))
        }
    }

    setUpdate(false)
  }

  return (
    <div>
      <Modal
        className='modal-content'
        style={customStyles}
        isOpen={update}
        onRequestClose={() => setUpdate(false)}>
          <div className='center flexbox-container-y'>
            <h2 style={{ color: "#115868", fontSize: 20 }}>Update Course</h2>
            <form onSubmit={handleSubmit}>
              <TextField required autoFocus 
                value={course.course_name} 
                onChange={(e) => setCourse({ ...course, course_name: e.target.value })}
                style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Course name' InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <GradeIcon style={{ height: '20px' }} color="action" />
                        </InputAdornment>
                    )
              }} />
              <TextField required 
                value={course.course_code} 
                onChange={(e) => setCourse({ ...course, course_code: e.target.value })}
                style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Course code' InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <CodeIcon style={{ height: '20px' }} color="action" />
                        </InputAdornment>
                    )
              }} />
              <TextField required 
                value={course.credit_hours} 
                onChange={(e) => setCourse({ ...course, credit_hours: e.target.value })}
                style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Credit hours' InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <AccessTimeIcon style={{ height: '20px' }} color="action" />
                        </InputAdornment>
                    )
              }} />
              <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Type</h3>
                        <select required className='dropdown' onChange={handleTypeChange}>
                            <option></option>
                            <option>Theory</option>
                            <option>Practical</option>
                        </select>
              <h3 style={{
                    fontWeight: 'normal', color: 'gray', marginRight: '3px'
                }}>
                  Department
              </h3>
              <select required className='dropdown' onChange={handleDepartmentChange}>
                  <option></option>
                  {
                      departmentsAdded && departments.length !== 0 ? departments.map(department =>
                          <option key={department.department_id}>{department.department_name}</option>) : null
                  }
              </select>
              <div className='center flexbox-container-y'>
                  <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Update</button>
              </div>
            </form>
          </div>
      </Modal>
    </div>
  )
}

export default UpdCourse
import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import '../Styling/Profile.css'
import Select from "react-select";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from 'react-redux'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import { getPositionRequest } from '../../redux/GetPosition/getPositionActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'
import { updateFaculty } from '../../redux/UpdateFaculty/updateFacultyActions'
import { updateAdminRequest } from '../../redux/UpdateAdmin/updateAdminActions'

function FacultyProfile() {

  const dispatch = useDispatch()

  const institute_id = localStorage.getItem('institute_id')
  const faculty_id = Number(localStorage.getItem('faculty_id'))
  const faculty = useSelector((state) => state.getFaculty.faculty)
  const facultyAdded = useSelector((state) => state.getFaculty.added)
  const departments = useSelector((state) => state.getDepartments.departments.data)
  const departmentsAdded = useSelector((state) => state.getDepartments.added)
  const positions = useSelector((state) => state.getPositionReducer.positions)
  const positionsAdded = useSelector((state) => state.getPositionReducer.added)
  const courses = useSelector((state) => state.getCourseReducer.courses)
  const coursesAdded = useSelector((state) => state.getCourseReducer.added)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState([]);
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState(null);
  const [password, setPassword] = useState("");
  const [positionsData, setPositons] = useState([]);
  const [specializationData, setSpecializationData] = useState([])
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [departmentId, setDepartmentId] = useState(0)
  const user_id = Number(localStorage.getItem('user_id'))

  useEffect(() => {
    if(institute_id > 0){
      dispatch(getFacultyRequest(institute_id))
      dispatch(getDepartmentsRequest(institute_id))
      dispatch(getPositionRequest(institute_id))
      dispatch(getCourseRequest(institute_id))
    }
  }, [institute_id])

  useEffect(() => {
    if(facultyAdded && departmentsAdded){
      for(let i of faculty){
        for(let j of departments){
          if(i.faculty_id === faculty_id && i.department_id === j.department_id){
            setName(i.name)
            setDesignation(i.designation)
            setSpecialization(i.specialization)
            setPhone(i.phone_number)
            setEmail(i.officialEmailAddress)
            setExperience(i.yearsOfExperience)
            setDepartment(j.department_name)
            setDepartmentId(j.department_id)
          }
        }
      }
    }
  }, [faculty, departments])

  useEffect(() => {
    if(positionsAdded && positionsData.length === 0){
      for(let i of positions){
        setPositons(positionsData => 
          [...positionsData, { value: i.position_name, label: i.position_name }])
      }
    }
  }, [positions])

  useEffect(() => {
    if(coursesAdded){
      setSpecializationData([])
      for(let i of courses){
        if(i.department_id === departmentId){
          setSpecializationData(specializationData => 
            [...specializationData, { label: i.course_name, value: i.course_name }])
        }
      }
    }
  }, [departmentId])

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEditClick = () => {
    if(isEditMode){
      setIsEditMode(false)
      if(experience === ''){
        for(let i of faculty){
          if(i.faculty_id === faculty_id){
            dispatch(updateFaculty(faculty_id, {name, phone_number: phone, designation, yearsOfExperience: i.yearsOfExperience, specialization}))
            dispatch(updateAdminRequest(user_id, {name, password}))
            alert('Updated successfully.')
          }
        }
      }
      else{
        dispatch(updateFaculty(faculty_id, {name, phone_number: phone, designation, yearsOfExperience: experience, specialization}))
        dispatch(updateAdminRequest(user_id, {name, password}))
        alert('Updated successfully.')
      }
    }else {
      setIsEditMode(true)
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleDesignationChange(data){
    setDesignation(data.value)
  }

  function handleSpecializationChange(data){
    setSpecialization(data.map(obj => obj.value))
  }

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
            <div className="profile">
            <h2 className="profile__title">My Profile</h2>
            <div className="profile__details">
              <div className="profile__detail">
                <span className="profile__label">Name:</span>
                {isEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{name}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Email:</span>
                <span className="profile__value">{email}</span>
              </div>
              <div className="profile__detail">
                <span className="profile__label">Phone:</span>
                {isEditMode ? (
                  <input
                    type="tel"
                    className="profile__input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{phone}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Designation:</span>
                {isEditMode ? (
                  <Select
                  className="profile__dropdown"
                  options={positionsData}
                  onChange={handleDesignationChange}
                  isSearchable={true}/>
                ) : (
                  <span className="profile__value">{designation}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Department:</span>
                <span className="profile__value">{department}</span>
              </div>
            </div>
            <div className="profile__detail">
                <label className="profile__label">Specialization:</label>
                {isEditMode ? (
                  <Select
                      className="profile__dropdown"
                      options={specializationData}
                      onChange={handleSpecializationChange}
                      isSearchable={true}
                      isMulti/>
                ) : (
                  <div className="profile__value">{specialization.join(', ')}</div>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Experience:</span>
                {isEditMode ? (
                  <input
                    type='number'
                    className="profile__input"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{experience}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Password:</span>
                {
                  isEditMode ? 
                  <TextField
                    className="profile__dropdown"
                    size='small'
                    variant="outlined"
                    type={passwordVisible ? "text" : "password"}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    onMouseDown={handleMouseDownPassword}>
                                    {passwordVisible ? <Visibility style={{ height: '20px' }} /> : <VisibilityOff style={{ height: '20px' }} />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} 
                    />:
                    <input
                      disabled
                      className="profile__password"
                      placeholder='Edit password...'
                    />
                }
              </div>
            <div className="profile__actions">
              <button className="profile__edit-button" onClick={handleEditClick}>
                {isEditMode ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>

    </div>
  )
}

export default FacultyProfile
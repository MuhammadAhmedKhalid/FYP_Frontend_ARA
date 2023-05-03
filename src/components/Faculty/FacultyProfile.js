import React, { useState } from 'react'
import FacultyNavbar from './FacultyNavbar'
import '../Styling/Profile.css'
import Select from "react-select";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from "@material-ui/core/IconButton";

function FacultyProfile() {

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1-123-456-7890");
  const [department, setDepartment] = useState("123 Main St, Anytown USA");
  const [specialization, setSpecialization] = useState("I am a web developer.");
  const [designation, setDesignation] = useState("I am a web developer.");
  const [experience, setExperience] = useState(5);
  const [password, setPassword] = useState("I am a web developer.");

  const [specializationData, setSpecializationData] = useState([{label: 'Male'}, {label: 'Female'}, {label: 'Other'}])

  const [isEditMode, setIsEditMode] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

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
            <h2 className="profile__title">Profile</h2>
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
                <span className="profile__label">Department:</span>
                <span className="profile__value">{department}</span>
              </div>
              <div className="profile__detail">
                <span className="profile__label">Designation:</span>
                {isEditMode ? (
                  <Select
                  className="profile__dropdown"
                  value={specialization}
                  options={specializationData}
                  onChange={(e) => setSpecialization(e.target.value)}
                  isSearchable={true}/>
                ) : (
                  <span className="profile__value">{designation}</span>
                )}
              </div>
            </div>
            <div className="profile__detail">
                <label className="profile__label">Specialization:</label>
                {isEditMode ? (
                  <Select
                      className="profile__dropdown"
                      value={specialization}
                      options={specializationData}
                      onChange={(e) => setSpecialization(e.target.value)}
                      isSearchable={true}
                      isMulti/>
                ) : (
                  <div className="profile__value">{specialization}</div>
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
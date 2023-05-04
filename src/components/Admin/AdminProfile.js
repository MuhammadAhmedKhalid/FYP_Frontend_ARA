import React, { useState, useEffect } from 'react'
import AdminNavBar from './AdminNavbar'
import '../Styling/Profile.css'
import { getInstitutesRequest } from '../../redux/GetInstitutes/getInstitutesActions'
import { getInstituteTypeRequest } from '../../redux/InstituteTypes/instituteTypesActions'
import { useSelector, useDispatch } from 'react-redux'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from "@material-ui/core/IconButton";

function AdminProfile() {

  const dispatch = useDispatch()

  const institutes = useSelector((state) => state.getInstitutes.institutes.data)
  const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)
  const types = useSelector((state) => state.instituteType.instituteTypes)

  const [name, setName] = useState(localStorage.getItem('name'));
  const [institute_name, setInstituteName] = useState(localStorage.getItem('institute_name'))
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState("");
  const [instituteType, setInstituteType] = useState("")
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isInstEditMode, setIsInstEditMode] = useState(false);
  const institute_id = localStorage.getItem('institute_id')
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    dispatch(getInstitutesRequest())
    dispatch(getInstituteTypeRequest())
  }, [])

  useEffect(() => {
    if(isInstitutesAdded){
      for(let i of institutes){
        for(let j of types){
          if(institute_id == i.institute_id && i.institute_type_id === j.institute_type_id){
            setAddress(i.address)
            setBranch(i.branch)
            setContact(i.contact)
            setInstituteType(j.name)
          }
        }
      }
    }
  }, [institutes])

  const handleEditClick = () => {
    if(isEditMode){
      setIsEditMode(false)
      console.log({name, email, password})
    }else{
      setIsEditMode(true)
    }
  };
  
  const handleInstEditClick = () => {
    setIsInstEditMode(!isInstEditMode);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '120vh',
                background: '#fff'
            }}>
        <div>
            <AdminNavBar />
            <div className="profile">
            <h2 className="profile__title">Admin Details</h2>
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
            <div className="profile">
            <h2 className="profile__title">Institute Detials</h2>
            <div className="profile__details">
              <div className="profile__detail">
                <span className="profile__label">Institute Name:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={institute_name}
                    onChange={(e) => setInstituteName(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{institute_name}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Institute Type:</span>
                <span className="profile__value">{instituteType}</span>
              </div>
              <div className="profile__detail">
                <span className="profile__label">Branch:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{branch}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Address:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{address}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Contact:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{contact}</span>
                )}
              </div>
            <div className="profile__actions">
              <button className="profile__edit-button" onClick={handleInstEditClick}>
                {isInstEditMode ? "Save" : "Edit"}
              </button>
            </div>
            </div>
            </div>
        </div>

    </div>
  )
}

export default AdminProfile
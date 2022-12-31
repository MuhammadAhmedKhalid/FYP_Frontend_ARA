import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector, useDispatch } from 'react-redux'
import { addFacultyRequest } from '../../../../redux/AddFaculty/addFacultyActions';

function AddFaculty(props) {

    const { openFacultyModal, setOpenFacultyModal, setRefresh } = props
    const dispatch = useDispatch()

    const admin_id = useSelector((state) => state.login.user.user_id)
    const institutes = useSelector((state) => state.getInstitutes.institutes.data)
    const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)

    const [faculty, setFaculty] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        officialEmailAddress: "",
        department: "software engineering",
        specialization: "cloud computing",
        designation: "lecturer",
        institute_id: "",
        user: {
            "name": "",
            "password": "12345678",
            "email": ""
        }
    })

    useEffect(() => {
        setFaculty({ ...faculty, user: { ...faculty.user, name: faculty.first_name + " " + faculty.last_name } })
    }, [faculty.first_name, faculty.last_name])

    useEffect(() => {
        if (isInstitutesAdded && institutes.length !== 0) {
            for (let i = 0; i < institutes.length; i++) {
                if (institutes[i].user_id === admin_id) {
                    setFaculty({ ...faculty, institute_id: institutes[i].institute_id })
                }
            }
        }
    }, [isInstitutesAdded])

    useEffect(() => {
        setRefresh(false)
    })

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

    const submitHandler = (event) => {
        event.preventDefault()
        setOpenFacultyModal(false)
        dispatch(addFacultyRequest(faculty))
        setRefresh(true)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openFacultyModal}
                onRequestClose={() => setOpenFacultyModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Faculty</h2>
                    <form onSubmit={submitHandler}>
                        <TextField value={faculty.first_name} onChange={(e) => setFaculty({ ...faculty, first_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='First Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PersonIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField value={faculty.last_name} onChange={(e) => setFaculty({ ...faculty, last_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Last Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PersonIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField value={faculty.phone_number} onChange={(e) => setFaculty({ ...faculty, phone_number: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Phone Number' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <CallIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField
                            value={faculty.officialEmailAddress}
                            onChange={(e) => setFaculty({ ...faculty, officialEmailAddress: e.target.value, user: { ...faculty.user, email: e.target.value } })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Email Address' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Department</h3>
                        <select value={faculty.department} onChange={(e) => setFaculty({ ...faculty, department: e.target.value })} className='dropdown'>
                            <option value="software engineering">Software Engineering</option>
                            <option value="civil engineering">Civil Engineering</option>
                            <option value="urban and infrastructure engineering">Urban and Infrastructure Engineering</option>
                            <option value="petroleum engineering">Petroleum Engineering</option>
                            <option value="mechanical engineering">Mechanical Engineering</option>
                            <option value="textile engineering">Textile Engineering</option>
                            <option value="electrical engineering">Electrical Engineering</option>
                            <option value="telecommunications engineering">Telecommunications Engineering</option>

                            <option>Chemical Engineering</option>
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Specialization</h3>
                        <select value={faculty.specialization} onChange={(e) => setFaculty({ ...faculty, specialization: e.target.value })} className='dropdown'>
                            <option value="cloud computing">Cloud Computing</option>
                            <option value="software project management">Software Project Management</option>
                            <option value="human computer interaction">Human Computer Interaction</option>
                            <option value="e-commerce">E-Commerce</option>
                            <option value="marketing">Marketing</option>
                            <option value="programming fundamentals">Programming Fundamentals</option>
                            <option value="introduction to software engineering">Introduction to Software Engineering</option>
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Designation</h3>
                        <select value={faculty.designation} onChange={(e) => setFaculty({ ...faculty, designation: e.target.value })} className='dropdown'>
                            <option value="lecturer">Lecturer</option>
                            <option value="instructor">Instructor</option>
                            <option value="assistant professor">Assistant Professor</option>
                            <option value="associate professor">Associate Professor</option>
                            <option value="professor">Professor</option>
                            <option value="research">Research Associate</option>
                            <option value="lab engineer">Lab Engineer</option>
                        </select>
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Add</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddFaculty
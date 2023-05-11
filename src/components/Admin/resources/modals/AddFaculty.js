import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector, useDispatch } from 'react-redux'
import { addFacultyRequest, resetState } from '../../../../redux/AddFaculty/addFacultyActions';
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../../../redux/GetCourse/getCourseActions'
import { getPositionRequest } from '../../../../redux/GetPosition/getPositionActions'
import { Alert } from '@mui/material';
import Select from "react-select";
import GradeIcon from '@mui/icons-material/Grade';

function AddFaculty(props) {

    const { openFacultyModal, setOpenFacultyModal } = props
    const dispatch = useDispatch()

    const admin_id = Number(localStorage.getItem('user_id'))
    const institutes = useSelector((state) => state.getInstitutes.institutes.data)
    const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const positions = useSelector((state) => state.getPositionReducer.positions)
    const positionsAdded = useSelector((state) => state.getPositionReducer.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)
    const institute_id = Number(localStorage.getItem('institute_id'))
    const [specializationData, setSpecializationData] = useState([])
    const requestSuccessfull = useSelector((state) => state.addFaculty.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addFaculty.error)

    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const [faculty, setFaculty] = useState({
        name: "",
        phone_number: "",
        officialEmailAddress: "",
        department_id: "",
        specialization: [],
        designation: "",
        institute_id,
        user: {
            "name": "",
            "password": "12345678",
            "email": ""
        },
        yearsOfExperience: ""
    })

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getPositionRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
        }
    }, [institute_id])


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
        if(requestSuccessfull){
            setOpenFacultyModal(false)
            setErrorMsg('')
            setShowError(false)
            alert("Operation performed successfully!")
            dispatch(resetState())
        } else if (requestSuccessfull === false) {
            setErrorMsg(requestUnsuccessfullMsg)
            setShowError(true)
            dispatch(resetState())
        }
    }, [requestSuccessfull])

    useEffect(()=>{
        if(departmentsAdded){
            if (courses !== undefined && departments !== undefined) {
                setSpecializationData([])
                for (let i = 0; i < courses.length; i++) {
                    for (let j = 0; j < departments.length; j++) {
                        if (courses[i].department_id === departments[j].department_id && departments[j].department_id === faculty.department_id) {
                            setSpecializationData(specializationData => 
                                [...specializationData, { label: courses[i].course_name, value: courses[i].course_name }])
                        }
                    }
                }
            }
        }
    }, [faculty.department_id])

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
        if(faculty.specialization.length === 0){
            alert('Select specialization.')
        } 
        if(faculty.yearsOfExperience < 0){
            alert('Years of experience should be in positive.')
        }else{
            dispatch(addFacultyRequest(faculty))
        }
    }
    
    function handleSelect(data) {
        setFaculty({ ...faculty, specialization: data.map(obj => obj.value) })
    }

    const handleDeptChange = (department_name) => {
        for(let i of departments){
            if(i.department_name === department_name){
                setFaculty({ ...faculty, department_id: i.department_id })
            }
        }
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
                        <TextField autoFocus required value={faculty.first_name} 
                        onChange={(e) => setFaculty({ ...faculty, name: e.target.value, user: { ...faculty.user, name: e.target.value } })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PersonIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField required value={faculty.phone_number} onChange={(e) => setFaculty({ ...faculty, phone_number: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Phone Number' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <CallIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField
                        required
                            value={faculty.officialEmailAddress}
                            onChange={(e) => setFaculty({ ...faculty, officialEmailAddress: e.target.value, user: { ...faculty.user, email: e.target.value } })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Email Address' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField
                        required
                            value={faculty.yearsOfExperience} onChange={(e) => setFaculty({ ...faculty, yearsOfExperience: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='number' placeholder='Years of Experience' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <GradeIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Designation</h3>
                        <select required value={faculty.designation} onChange={(e) => setFaculty({ ...faculty, designation: e.target.value })} className='dropdown'>
                            <option></option>
                            {
                                positionsAdded && positions.length !== 0 ? positions.map(position =>
                                    <option key={position.position_id}>{position.position_name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Department</h3>
                        <select required onChange={(e) => handleDeptChange(e.target.value)} className='dropdown'>
                            <option></option>
                            {
                                departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                    <option key={department.department_id}>{department.department_name}</option>) : null
                            }
                        </select>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Specialization</h3>
                        <Select
                            options={specializationData}
                            onChange={handleSelect}
                            isSearchable={true}
                            isMulti
                        />
                        <div>
                            {
                                showError && <Alert style={{ marginTop: '12px' }} severity="error">{errorMsg}</Alert>
                            }
                        </div>
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
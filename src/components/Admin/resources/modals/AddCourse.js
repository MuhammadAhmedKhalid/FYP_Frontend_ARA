import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import GradeIcon from '@mui/icons-material/Grade';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { addCourseRequest, resetState } from '../../../../redux/AddCourse/addCourseActions'
import { Alert } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function AddCourse(props) {

    const { openCourseModal, setOpenCourseModal, setRefresh } = props

    const dispatch = useDispatch()

    const institute_id = Number(localStorage.getItem('institute_id'))
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const requestSuccessfull = useSelector((state) => state.addCourseReducer.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addCourseReducer.error)
    
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const [course, setCourse] = useState({
        course_name: "",
        department_id: "",
        course_code: "",
        credit_hours: "",
        type: "",
        institute_id
    })

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [institute_id])
    
    useEffect(() => {
        if(requestSuccessfull){
            setRefresh(true)
            setOpenCourseModal(false)
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

    const closeModal = () => {
        setOpenCourseModal(false)
        setShowError(false)
        setErrorMsg('')
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(addCourseRequest(course))
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openCourseModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Course</h2>
                    <form onSubmit={submitHandler}>
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
                            {/* <TextField required 
                            value={course.credit_hours} 
                            onChange={(e) => setCourse({ ...course, credit_hours: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Credit hours' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AccessTimeIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} /> */}
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Credit hours</h3>
                        <select required className='dropdown' onChange={(e) => setCourse({ ...course, credit_hours: e.target.value })}>
                            <option></option>
                            <option>3+0</option>
                            <option>0+3</option>
                            <option>2+0</option>
                            <option>0+2</option>
                            <option>1+0</option>
                            <option>0+1</option>
                        </select>
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
                        }}>Department</h3>
                        <select required className='dropdown' onChange={handleDepartmentChange}>
                            <option></option>
                            {
                                departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                    <option key={department.department_id}>{department.department_name}</option>) : null
                            }
                        </select>
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

export default AddCourse
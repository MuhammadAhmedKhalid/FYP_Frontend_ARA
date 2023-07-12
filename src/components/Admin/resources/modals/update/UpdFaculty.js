import React, { useState, useEffect, useRef } from 'react'
import Modal from 'react-modal'
import { getFacultyRequest } from '../../../../../redux/GetFaculty/getFacultyActions'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../../redux/GetDepartments/getDepartmentsActions'
import { updateFaculty } from '../../../../../redux/UpdateFaculty/updateFacultyActions'
import { getPositionRequest } from '../../../../../redux/GetPosition/getPositionActions'
import { getCourseRequest } from '../../../../../redux/GetCourse/getCourseActions'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import Select from "react-select";
import GradeIcon from '@mui/icons-material/Grade';
import emailjs from '@emailjs/browser';
import CodeIcon from '@mui/icons-material/Code';

function UpdFaculty({update, setUpdate, data}) {

    const dispatch = useDispatch()

    const facultyList = useSelector((state) => state.getFaculty.faculty)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const positions = useSelector((state) => state.getPositionReducer.positions)
    const positionsAdded = useSelector((state) => state.getPositionReducer.added)
    const courses = useSelector((state) => state.getCourseReducer.courses)

    const institute_id = Number(localStorage.getItem('institute_id'))

    const form = useRef();
    const [specializationData, setSpecializationData] = useState([])

    const [faculty, setFaculty] = useState({
        name: data[1],
        code: data[8],
        phone_number: data[2],
        officialEmailAddress: data[3],
        department_id: "",
        specialization: [],
        designation: data[6],
        institute_id,
        yearsOfExperience: data[7]
    })

    useEffect(() => {
        if(institute_id>0){
            dispatch(getFacultyRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getPositionRequest(institute_id))
            dispatch(getCourseRequest(institute_id))
        }
    }, [institute_id])

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

    const handleDepartmentChange = (e) => {
        const department_name = e.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setFaculty({ ...faculty, department_id: departments[i].department_id })
            }
        }
    }

    function handleSelect(data) {
        setFaculty({ ...faculty, specialization: data.map(obj => obj.value) })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        for(let i of facultyList){
            if(i.officialEmailAddress === data[3]){
                if(i.officialEmailAddress !== faculty.officialEmailAddress){
                    emailjs.sendForm('service_tjvggdm', 'template_wrlj0ov', form.current, 'nvzT6R7t3FB6c7LN0')
                }
                dispatch(updateFaculty(i.faculty_id, JSON.stringify(faculty)))
            }
        }

        setUpdate(false);
    }

    return (
    <div>
        <Modal
                className='modal-content'
                style={customStyles}
                isOpen={update}
                onRequestClose={() => setUpdate(false)}>
            <div className='center flexbox-container-y'>
                <h2 style={{ color: "#115868", fontSize: 20 }}>Update Faculty</h2>
                <form ref={form} onSubmit={handleSubmit}>
                    <TextField autoFocus required value={faculty.name}
                    onChange={(e) => setFaculty({ ...faculty, name: e.target.value})}
                    style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Name' InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <PersonIcon style={{ height: '20px' }} color="action" />
                            </InputAdornment>
                        )
                    }} />
                    <TextField required value={faculty.code}
                    onChange={(e) => setFaculty({ ...faculty, code: e.target.value })}
                    style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Code' InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <CodeIcon style={{ height: '20px' }} color="action" />
                            </InputAdornment>
                        )
                    }} />
                    <TextField required value={faculty.phone_number} 
                    onChange={(e) => setFaculty({ ...faculty, phone_number: e.target.value })}
                    style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Phone Number' InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <CallIcon style={{ height: '20px' }} color="action" />
                            </InputAdornment>
                        )
                    }} />
                    <TextField required value={faculty.officialEmailAddress}
                    onChange={(e) => setFaculty({ ...faculty, officialEmailAddress: e.target.value })}
                    style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Email Address' InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <EmailIcon style={{ height: '20px' }} color="action" />
                            </InputAdornment>
                        )
                    }} />
                    <TextField required value={faculty.yearsOfExperience} 
                    onChange={(e) => setFaculty({ ...faculty, yearsOfExperience: e.target.value })}
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
                    <select required
                     onChange={(e) => setFaculty({ ...faculty, designation: e.target.value })} className='dropdown'>
                        <option></option>
                        {
                            positionsAdded && positions.length !== 0 ? positions.map(position =>
                                <option key={position.position_id}>{position.position_name}</option>) : null
                        }
                    </select>
                    <h3 style={{
                        fontWeight: 'normal', color: 'gray', marginRight: '3px'
                    }}>Department</h3>
                    <select required onChange={handleDepartmentChange} className='dropdown'>
                        <option></option>
                        {
                            departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                <option key={department.department_id}>{department.department_name}</option>) : null
                        }
                    </select>
                    <Select
                        options={specializationData}
                        onChange={handleSelect}
                        isSearchable={true}
                        isMulti
                    />
                    <div className='center flexbox-container-y'>
                        <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Update</button>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
    )
}

export default UpdFaculty
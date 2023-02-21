import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import GradeIcon from '@mui/icons-material/Grade';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'

function AddSpecialization(props) {

    const { openSpecializationModal, setOpenSpecializationModal, setRefresh } = props

    const dispatch = useDispatch()

    const institute_id = useSelector((state) => state.login.user.institute_id)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

    const [specialization, setSpecialization] = useState({
        specialization_name: " ",
        department_id: " ",
        institute_id
    })

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
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
                setSpecialization({ ...specialization, department_id: departments[i].department_id })
            }
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        setOpenSpecializationModal(false)
        setRefresh(true)
        console.log(specialization)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openSpecializationModal}
                onRequestClose={() => setOpenSpecializationModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Specialization</h2>
                    <form onSubmit={submitHandler}>
                    <TextField required autoFocus value={specialization.specialization_name} onChange={(e) => setSpecialization({ ...specialization, specialization_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Specialization Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <GradeIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
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
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Add</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddSpecialization
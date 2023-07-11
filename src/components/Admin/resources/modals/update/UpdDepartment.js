import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../../../redux/GetDepartments/getDepartmentsActions'
import { updateDepartment, resetState } from '../../../../../redux/UpdateDepartment/updateDeptActions'


function UpdDepartment({update, setUpdate, data}) {

    const dispatch = useDispatch()

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const updateError = useSelector((state) => state.updateDepartmentReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateDepartmentReducer.updated)

    const institute_id = Number(localStorage.getItem('institute_id'))

    const [department, setDepartment] = useState({
        department_name: data[1],
    })

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [institute_id])

    useEffect(()=>{
        if(updateError.length > 0){
            alert(updateError)
            dispatch(resetState())
        }else if(updatedSuccessfully){
            alert('Updated successfully.')
            dispatch(resetState())
        }
    }, [updateError, updatedSuccessfully])

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
        setDepartment({ ...department, department_name: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        for(let i of departments){
            if(i.department_id === data[0]){
                dispatch(updateDepartment(i.department_id, department.department_name))
                break
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
                        <h2 style={{ color: "#115868", fontSize: 20 }}>Update Department</h2>
                        <form onSubmit={submitHandler}>
                            <TextField required autoFocus value={department.department_name}
                                onChange={handleDepartmentChange}
                                style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Department Name' InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LocalLibraryIcon style={{ height: '20px' }} color="action" />
                                        </InputAdornment>
                                    )
                            }} />
                            <div className='center flexbox-container-y'>
                                <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Update</button>
                            </div>
                        </form>
                    </div>
            </Modal>
        </div>
    )
}

export default UpdDepartment
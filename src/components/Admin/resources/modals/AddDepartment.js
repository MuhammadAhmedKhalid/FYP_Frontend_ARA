import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'
import { addDepartmentRequest, resetState } from '../../../../redux/AddDepartment/addDepartmentActions'
import { Alert } from '@mui/material';

function AddDepartment(props) {

    const { openDepartmentModal, setOpenDepartmentModal, setRefresh } = props

    const dispatch = useDispatch()

    const institute_id = Number(localStorage.getItem('institute_id'))
    const requestSuccessfull = useSelector((state) => state.addDepartmentReducer.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addDepartmentReducer.error)

    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        if(requestSuccessfull){
            setRefresh(true)
            setOpenDepartmentModal(false)
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

    const [department, setDepartment] = useState({
        department_name: "",
        institute_id
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

    const closeModal = () => {
        setOpenDepartmentModal(false)
        setShowError(false)
        setErrorMsg('')
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(addDepartmentRequest(department))
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openDepartmentModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Department</h2>
                    <form onSubmit={submitHandler}>
                        <TextField required autoFocus value={department.department_name} onChange={(e) => setDepartment({ ...department, department_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Department Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LocalLibraryIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                            }} />
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

export default AddDepartment
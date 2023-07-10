import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import GroupsIcon from '@mui/icons-material/Groups';
import { useSelector, useDispatch } from 'react-redux'
import { addBatchtRequest, resetState } from '../../../../redux/AddBatch/addBatchActions'
import { Alert } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import TagIcon from '@mui/icons-material/Tag';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { departmentsList } from '../../utils'
import { specializationOptions } from '../../utils'

function AddBatches(props) {

    const { openBatchModal, setOpenBatchModal, setRefresh } = props

    const dispatch = useDispatch()

    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [specialization, setSpecialization] = useState([])

    // const departments = useSelector((state) => state.getDepartments.departments.data)
    // const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const departments = departmentsList
    const institute_id = Number(localStorage.getItem('institute_id'))
    const requestSuccessfull = useSelector((state) => state.addBatchReducer.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addBatchReducer.error)

    const [batch, setBatch] = useState({
        batchYear: "",
        batchCode: "",
        noOfStudents: "",
        section: "",
        department: "",
        institute_id,
    })

    useEffect(() => {
        if(requestSuccessfull){
            setRefresh(true)
            setOpenBatchModal(false)
            setErrorMsg('')
            setShowError(false)
            alert("Operation performed successfully!")
            dispatch(resetState())
        } else if (requestSuccessfull === false) {
            setErrorMsg(requestUnsuccessfullMsg)
            setShowError(true)
            dispatch(resetState())
        }
    }, [requestSuccessfull, dispatch, requestUnsuccessfullMsg, setOpenBatchModal])

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
    const handleForm = (event) => {
        event.preventDefault()
        console.log(batch)
        // dispatch(addBatchtRequest(batch))
    }

    const handleDepartmentChange = (e) => {
        const department_name = e.target.value
            for (let i = 0; i < specializationOptions.length; i++) {
                if (specializationOptions[i].department === department_name) {
                    // setBatch({ ...batch, department_id: specializationOptions[i].department_id })
                    setSpecialization(specializationOptions[i].specialization)
                }
            }
    }

    const handleSpecializationChange = (e) => {
        setBatch({ ...batch, department: e.target.value })
    }

    const closeModal = () => {
        setOpenBatchModal(false)
        setShowError(false)
        setErrorMsg('')
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openBatchModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Batch</h2>
                    <form onSubmit={handleForm}>
                        <TextField required autoFocus style={{ margin: '3px' }} size='small' variant="outlined" type='number' placeholder='Batch year' 
                        onChange={(e) => setBatch({ ...batch, batchYear: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <GroupsIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Batch code' 
                        onChange={(e) => setBatch({ ...batch, batchCode: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <CodeIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='number' placeholder='Number of students' 
                        onChange={(e) => setBatch({ ...batch, noOfStudents: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <TagIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Section' 
                        onChange={(e) => setBatch({ ...batch, section: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <WorkspacesIcon style={{ height: '20px' }} color="action" />
                                </InputAdornment>
                            )
                        }} />
                        <div style={{ margin: '3px' }} className='flexbox-container-y'>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Department</h3>
                            <select required className='dropdown' onChange={handleDepartmentChange}>
                            <option></option>
                                {
                                    departments.length !== undefined ? departments.map(department => 
                                        <option key={department.id}>{department.name}</option>) : null
                                }
                            </select>
                        </div>
                        <div style={{ margin: '3px' }} className='flexbox-container-y'>
                            <h3 style={{
                                fontWeight: 'normal', color: 'gray', marginRight: '3px'
                            }}>Specialization</h3>
                            <select required className='dropdown' onChange={handleSpecializationChange}>
                            <option></option>
                                {
                                    specialization.length !== 0 ? specialization.map((specialization, index) => 
                                        <option key={index}>{specialization}</option>) : null
                                }
                            </select>
                        </div>
                        <div>
                            {
                                showError && <Alert style={{ marginTop: '12px' }} severity="error">{errorMsg}</Alert>
                            }
                        </div>
                        <center><button className='modal-btn' style={{marginTop: '20px'}} type='submit'>Add</button></center>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddBatches
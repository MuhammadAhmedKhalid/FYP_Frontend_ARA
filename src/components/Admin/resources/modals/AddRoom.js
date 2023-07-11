import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { addRoomRequest, resetState } from '../../../../redux/AddRoom/addRoomActions'
import { Alert } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

function AddRoom(props) {

    const { openRoomModal, setOpenRoomModal, setRefresh } = props

    const dispatch = useDispatch()

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_id = Number(localStorage.getItem('institute_id'))
    const requestSuccessfull = useSelector((state) => state.addRoomReducer.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addRoomReducer.error)

    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const [room, setRoom] = useState({
        room_name: "",
        location: "",
        area: "",
        department_id: "",
        institute_id
    })

    useEffect(() => {
        if(requestSuccessfull){
            setRefresh(true)
            setOpenRoomModal(false)
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

    const handleDepartmentChange = (e) => {
        const department_name = e.target.value
            for (let i = 0; i < departments.length; i++) {
                if (departments[i].department_name === department_name) {
                    setRoom({ ...room, department_id: departments[i].department_id })
                }
            }
    }

    const closeModal = () => {
        setOpenRoomModal(false)
        setShowError(false)
        setErrorMsg('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addRoomRequest(room))
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openRoomModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Room</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField autoFocus required style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Room Name.' 
                                    onChange={(e) => setRoom({ ...room, room_name: e.target.value })}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <MeetingRoomIcon style={{ height: '20px' }} color="action" />
                                            </InputAdornment>
                                        )
                            }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' 
                        placeholder='Floor/Location' 
                            onChange={(e) => setRoom({ ...room, location: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <RoomIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                        }} />
                        <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' 
                        placeholder='Area' 
                            onChange={(e) => setRoom({ ...room, area: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SquareFootIcon style={{ height: '20px' }} color="action" />
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
                                    departmentsAdded && departments.length !== 0 ? departments.map(department => 
                                        <option key={department.department_id}>{department.department_name}</option>) : null
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

export default AddRoom
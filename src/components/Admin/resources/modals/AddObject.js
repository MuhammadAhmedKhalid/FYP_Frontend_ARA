import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { useSelector, useDispatch } from 'react-redux'
import { addObjectRequest, resetState } from '../../../../redux/AddObject/addObjectActions'
import { Alert } from '@mui/material';

function AddObject(props) {

    const { openObjectModal, setOpenObjectModal, setRefresh } = props

    const dispatch = useDispatch()

    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_id = Number(localStorage.getItem('institute_id'))
    const requestSuccessfull = useSelector((state) => state.addObjectReducer.added)
    const requestUnsuccessfullMsg = useSelector((state) => state.addObjectReducer.error)

    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const [roomsData, setRoomsData] = useState([])

    const [object, setObject] = useState({
        object_name: "",
        quantity: "",
        department_id: "",
        room_id: "",
        institute_id
    })

    useEffect(() => {
        if(requestSuccessfull){
            setRefresh(true)
            setOpenObjectModal(false)
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

    useEffect(() => {
        if (departmentsAdded) {
            if (rooms !== undefined && departments !== undefined) {
                setRoomsData([])
                for (let i = 0; i < rooms.length; i++) {
                    for (let j = 0; j < departments.length; j++) {
                        if (rooms[i].department_id === departments[j].department_id && departments[j].department_id === object.department_id) {
                            setRoomsData(roomsData => [...roomsData, { id: rooms[i].room_id, name: rooms[i].room_name }])
                        }
                    }
                }
            }
        }
    }, [object.department_id])

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
                setObject({ ...object, department_id: departments[i].department_id })
            }
        }
    }

    const handleRoomChange = (event) => {
        const room_name = event.target.value
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room_name === room_name && rooms[i].department_id == object.department_id) {
                setObject({ ...object, room_id: rooms[i].room_id })
            }
        }
    }

    const closeModal = () => {
        setOpenObjectModal(false)
        setShowError(false)
        setErrorMsg('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addObjectRequest(object))
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openObjectModal}
                onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Object</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField autoFocus required style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Object Name.' 
                                onChange={(e) => setObject({ ...object, object_name: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmojiObjectsIcon style={{ height: '20px' }} color="action" />
                                        </InputAdornment>
                                    )
                        }} />
                        <TextField
                        required
                            onChange={(e) => setObject({ ...object, quantity: e.target.value })}
                            label='Quantity'
                            style={{ marginTop: '12px' }}
                            size='small'
                            variant="outlined"
                            type='number' />
                            <div style={{ margin: '3px' }} className='flexbox-container-y'>
                            <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>Department</h3>
                        <select required className='dropdown' onChange={handleDepartmentChange}>
                            <option></option>
                            {
                                departmentsAdded && departments.length !== 0 ? departments.map(department =>
                                    <option key={department.department_id}>{department.department_name}</option>) : null
                            }
                        </select>
                        </div>
                        <div style={{ margin: '3px' }} className='flexbox-container-y'>
                        <h3 style={{
                            fontWeight: 'normal', color: 'gray', marginRight: '3px'
                        }}>Room No.</h3>
                        <select required className='dropdown' onChange={handleRoomChange}>
                            <option></option>
                            {
                                roomsData.length !== 0 ? roomsData.map(room =>
                                    <option key={room.id}>{room.name}</option>) : null
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

export default AddObject
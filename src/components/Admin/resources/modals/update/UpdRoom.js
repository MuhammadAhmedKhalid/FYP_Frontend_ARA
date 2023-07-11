import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RoomIcon from '@mui/icons-material/Room';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { getRoomsRequest } from '../../../../../redux/GetRooms/getRoomsActions'
import { getDepartmentsRequest } from '../../../../../redux/GetDepartments/getDepartmentsActions'
import { updateRoom, resetState } from '../../../../../redux/UpdateRoom/updateRoomActions' 

function UpdRoom({update, setUpdate, data}) {

    const dispatch = useDispatch()

    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const updateError = useSelector((state) => state.updateRoomReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateRoomReducer.updated)

    const institute_id = Number(localStorage.getItem('institute_id'))

    const [room, setRoom] = useState({
        room_name: data[1],
        location: data[3],
        area: data[4],
        department_id: "",
        institute_id
    })

    useEffect(()=>{
        if(updateError.length > 0){
            alert(updateError)
            dispatch(resetState())
        }else if(updatedSuccessfully){
            alert('Updated successfully.')
            dispatch(resetState())
        }
    }, [updateError, updatedSuccessfully])

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getRoomsRequest(institute_id))
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

    const handleDepartmentChange = (e) => {
        const department_name = e.target.value
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].department_name === department_name) {
                setRoom({ ...room, department_id: departments[i].department_id })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        for(let i of rooms){
            if(i.room_id === data[0]){
                dispatch(updateRoom(i.room_id, i.department_id, room))
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
                        <h2 style={{ color: "#115868", fontSize: 20 }}>Update Room</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField autoFocus required style={{ margin: '3px' }} size='small' variant="outlined" type='text' 
                                placeholder='Room Name.' value={room.room_name}
                                onChange={(e) => setRoom({ ...room, room_name: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <MeetingRoomIcon style={{ height: '20px' }} color="action" />
                                        </InputAdornment>
                                    )
                            }} />
                            <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' 
                                placeholder='Floor/Location' value={room.location}
                                onChange={(e) => setRoom({ ...room, location: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <RoomIcon style={{ height: '20px' }} color="action" />
                                        </InputAdornment>
                                    )
                            }} />
                            <TextField required style={{ margin: '3px' }} size='small' variant="outlined" type='text' 
                                placeholder='Area' value={room.area}
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
                            <div className='center flexbox-container-y'>
                                <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Update</button>
                            </div>
                        </form>
                    </div>
            </Modal>
        </div>
    )
}

export default UpdRoom
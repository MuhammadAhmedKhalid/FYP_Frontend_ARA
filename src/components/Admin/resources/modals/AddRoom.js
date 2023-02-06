import React, { useState } from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import GroupsIcon from '@mui/icons-material/Groups';

function AddRoom(props) {

    const { openRoomModal, setOpenRoomModal } = props

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

    const [room, setRoom] = useState({
        room_name: "",
        department_id: ""
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
        setOpenRoomModal(false)
        console.log(room)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={openRoomModal}
                onRequestClose={() => setOpenRoomModal(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Add Room</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField autoFocus required style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Room Name.' 
                                    onChange={(e) => setRoom({ ...room, room_name: e.target.value })}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <GroupsIcon style={{ height: '20px' }} color="action" />
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
                        <center><button className='modal-btn' style={{marginTop: '20px'}} type='submit'>Add</button></center>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddRoom
import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddRoom from './modals/AddRoom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getRoomsRequest } from '../../../redux/GetRooms/getRoomsActions'

function Rooms() {

    const dispatch = useDispatch()

    const [openRoomModal, setOpenRoomModal] = useState(false)
    const rooms = useSelector((state) => state.getRooms.rooms.data)

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

    const [roomData, setRoomData] = useState([])

    const openModal = () => {
        setOpenRoomModal(true)
    }

    useEffect(() => {
        if (departmentsAdded) {
            if (rooms.length !== 0 && departments.length !== 0) {
                for (let i = 0; i < rooms.length; i++) {
                    for (let j = 0; j < departments.length; j++) {
                        if (rooms[i].department_id === departments[j].department_id) {
                            setRoomData(roomData => [...roomData, rooms[i].name + " " + departments[j].department_name])
                        }
                    }
                }
            }
        }
    }, [rooms, departments])

    useEffect(() => {
        dispatch(getRoomsRequest())
        dispatch(getDepartmentsRequest())
    }, [])

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD ROOM</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>ROOMS LIST</h2>
                    </div>
                    <center>
                        <div>
                            {
                                roomData.length !== 0 ? roomData.map(room => <div key={roomData.indexOf(room)}>{room}</div>) : null
                            }
                        </div>
                    </center>
                </div>
            </div>
            <div>
                <AddRoom openRoomModal={openRoomModal} setOpenRoomModal={setOpenRoomModal} />
            </div>
        </div>
    )
}

export default Rooms
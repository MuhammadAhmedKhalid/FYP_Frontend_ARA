import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddRoom from './modals/AddRoom'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getRoomsRequest } from '../../../redux/GetRooms/getRoomsActions'
import Table from '../../Root/Table'

function Rooms() {

    const dispatch = useDispatch()

    const [openRoomModal, setOpenRoomModal] = useState(false)
    const [roomData, setRoomData] = useState([])

    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)

    const openModal = () => {
        setOpenRoomModal(true)
    }

    useEffect(() => {
        if (departmentsAdded) {
            if (rooms.length !== 0 && departments.length !== 0 && roomData.length === 0) {
                for (let i = 0; i < departments.length; i++) {
                    for (let j = 0; j < rooms.length; j++) {
                        if (rooms[j].department_id === departments[i].department_id) {
                            setRoomData(roomData => [...roomData, [rooms[j].name, departments[i].department_name]])
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
                        <h2 style={{ color: '#0E5E6F' }}>ROOMS</h2>
                    </div>
                    <center>
                        {
                            roomsAdded && <Table columns={['No.', 'Room Name', 'Department']} rows={roomData}/>
                        }
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
import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddRoom from './modals/AddRoom'
import axios from 'axios'

function Rooms() {
    const [openRoomModal, setOpenRoomModal] = useState(false)
    const [rooms, setRooms] = useState([])
    const [departments, setDepartments] = useState([])
    const [roomData, setRoomData] = useState([])

    const openModal = () => {
        setOpenRoomModal(true)
    }

    useEffect(() => {
        if (rooms.length !== 0 && departments.length !== 0) {
            for (let i = 0; i < rooms.length; i++) {
                for (let j = 0; j < departments.length; j++) {
                    if (rooms[i].department_id === departments[j].department_id) {
                        setRoomData(roomData => [...roomData, rooms[i].name + " " + departments[j].department_name])
                    }
                }
            }
        }
    }, [rooms, departments])

    useEffect(() => {
        axios.get('http://localhost:8080/rooms')
            .then((response) => { setRooms(response.data) })
            .catch((error) => { console.log(error) })
        axios.get('http://localhost:8080/departments')
            .then((response) => { setDepartments(response.data) })
            .catch((error) => { console.log(error) })
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
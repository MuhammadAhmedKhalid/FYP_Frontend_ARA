import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddRoom from './modals/AddRoom'
import axios from 'axios'

function Rooms() {
    const [openRoomModal, setOpenRoomModal] = useState(false)
    const [rooms, setRooms] = useState([])

    const openModal = () => {
        setOpenRoomModal(true)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/rooms')
            .then((response) => { setRooms(response.data) })
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
                                rooms.length !== 0 ? rooms.map(room => <div key={room.room_id}>{room.room_id}. {room.name} (Department ID: {room.department_id})</div>) : null
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
import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddObject from './modals/AddObject'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getRoomsRequest } from '../../../redux/GetRooms/getRoomsActions'

function Objects() {

    const dispatch = useDispatch()

    const [openObjectModal, setOpenObjectModal] = useState(false)
    const [objects, setObjects] = useState([])
    const [objectTypes, setObjectTypes] = useState([])

    const rooms = useSelector((state) => state.getRooms.rooms.data)
    // const roomsAdded = useSelector((state) => state.getRooms.added)

    const [objectData, setObjectData] = useState([])

    const openModal = () => {
        setOpenObjectModal(true)
    }

    useEffect(() => {
        if (objects.length !== 0 && objectTypes.length !== 0) {
            for (let i = 0; i < objects.length; i++) {
                for (let j = 0; j < objectTypes.length; j++) {
                    for (let k = 0; k < rooms.length; k++) {
                        if (objects[i].resource_type_id === objectTypes[j].resource_type_id && objects[i].room_id === rooms[k].room_id) {
                            setObjectData(objectData =>
                                [...objectData, "Name: " + objectTypes[j].name + " Quantity: " + objects[i].quantity + " Room: " + rooms[k].name])
                        }
                    }
                }
            }
        }
    }, [objects, objectTypes])

    useEffect(() => {
        axios.get('http://localhost:8080/resources')
            .then((response) => { setObjects(response.data) })
            .catch((error) => { console.log(error) })
        axios.get('http://localhost:8080/resourceTypes')
            .then((response) => { setObjectTypes(response.data) })
            .catch((error) => { console.log(error) })
        dispatch(getRoomsRequest())
    }, [])

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD OBJECT</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>OBJECTS LIST</h2>
                    </div>
                    <center>
                        <div>
                            {
                                objectData.length !== 0 ? objectData.map(object =>
                                    <div key={objectData.indexOf(object)}>{object}</div>) : null
                            }
                        </div>
                    </center>
                </div>
            </div>
            <div>
                <AddObject openObjectModal={openObjectModal} setOpenObjectModal={setOpenObjectModal} />
            </div>
        </div>
    )
}

export default Objects
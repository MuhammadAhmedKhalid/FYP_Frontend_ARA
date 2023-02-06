import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddObject from './modals/AddObject'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getRoomsRequest } from '../../../redux/GetRooms/getRoomsActions'
import { getResourceTypesRequest } from '../../../redux/GetResourceTypes/getResourceActions'
import { getResources } from '../../../redux/GetResources/getResourcesActions'

function Objects() {

    const dispatch = useDispatch()

    const [openObjectModal, setOpenObjectModal] = useState(false)
    const [objectData, setObjectData] = useState([])

    const objects = useSelector((state) => state.getResources.resources.data)
    const objectsAdded = useSelector((state) => state.getResources.added)
    const objectTypes = useSelector((state) => state.getResourceTypes.resource_types.data)
    const objectTypesAdded = useSelector((state) => state.getResourceTypes.added)
    const rooms = useSelector((state) => state.getRooms.rooms.data)

    const openModal = () => {
        setOpenObjectModal(true)
    }

    useEffect(() => {
        if (objectsAdded && objectTypesAdded) {
            if (objects.length !== 0 && objectTypes.length !== 0 && objectData.length === 0) {
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
        }
    }, [objects, objectTypes])

    useEffect(() => {
        dispatch(getResources())
        dispatch(getResourceTypesRequest())
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
                                objectData.length !== 0 ? objectData.map((object, index) =>
                                    <div key={index}>{object}</div>) : null
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
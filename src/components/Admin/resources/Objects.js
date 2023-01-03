import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddObject from './modals/AddObject'
import axios from 'axios'

function Objects() {
    const [openObjectModal, setOpenObjectModal] = useState(false)
    const [objects, setObjects] = useState([])
    const [objectTypes, setObjectTypes] = useState([])

    const openModal = () => {
        setOpenObjectModal(true)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/resources')
            .then((response) => { setObjects(response.data) })
            .catch((error) => { console.log(error) })

        axios.get('http://localhost:8080/resourceTypes')
            .then((response) => { setObjectTypes(response.data) })
            .catch((error) => { console.log(error) })
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
                                objectTypes.length !== 0 ? objectTypes.map(objectType =>
                                    <div key={objectType.resource_type_id}>{objectType.resource_type_id}. (Resource type ID: {objectType.resource_type_id})
                                        (Name: {objectType.name})</div>) : null
                            }
                        </div>
                        <br />
                        <div>
                            {
                                objects.length !== 0 ? objects.map(object =>
                                    <div key={object.resource_id}>{object.resource_id}. (Quantity: {object.quantity}) (Resource type ID: {object.resource_type_id})
                                        (Room type ID: {object.room_id})</div>) : null
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
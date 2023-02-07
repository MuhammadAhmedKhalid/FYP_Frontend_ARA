import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddObject from './modals/AddObject'
import { useSelector, useDispatch } from 'react-redux'
import { getRoomsRequest } from '../../../redux/GetRooms/getRoomsActions'
import { getResourceTypesRequest } from '../../../redux/GetResourceTypes/getResourceActions'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getResources } from '../../../redux/GetResources/getResourcesActions'
import Table from '../../Root/Table'

function Objects() {

    const dispatch = useDispatch()

    const [openObjectModal, setOpenObjectModal] = useState(false)
    const [objectData, setObjectData] = useState([])

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const objects = useSelector((state) => state.getResources.resources.data)
    const objectsAdded = useSelector((state) => state.getResources.added)
    const objectTypes = useSelector((state) => state.getResourceTypes.resource_types.data)
    const objectTypesAdded = useSelector((state) => state.getResourceTypes.added)
    const rooms = useSelector((state) => state.getRooms.rooms.data)

    const openModal = () => {
        setOpenObjectModal(true)
    }

    useEffect(() => {
        if (objectsAdded && objectTypesAdded && departmentsAdded) {
            if (objects.length !== 0 && objectTypes.length !== 0 && objectData.length === 0) {
                for (let i = 0; i < objects.length; i++) {
                    for (let j = 0; j < objectTypes.length; j++) {
                        for (let k = 0; k < rooms.length; k++) {
                            for (let l = 0; l < departments.length; l++){
                                if (objects[i].resource_type_id === objectTypes[j].resource_type_id && objects[i].room_id === rooms[k].room_id 
                                    && rooms[k].department_id === departments[l].department_id ) {
                                    setObjectData(objectData =>
                                        [...objectData, {column1: objectTypes[j].name,  column2: objects[i].quantity, 
                                            column3: rooms[k].name, column4: departments[l].department_name}])
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [objects, objectTypes, departmentsAdded])

    useEffect(() => {
        dispatch(getResources())
        dispatch(getResourceTypesRequest())
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
                        <button className='modal-btn-w' onClick={openModal}>ADD OBJECT</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>OBJECTS</h2>
                    </div>
                    <center>
                        <div>
                            {
                                objectsAdded && <Table columns={['No.', 'Name', 'Quantity', 'Room Name', 'Department']} rows={objectData}/>
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
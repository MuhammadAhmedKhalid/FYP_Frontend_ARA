import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddRoom from './modals/AddRoom'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getRoomsRequest } from '../../../redux/GetRooms/getRoomsActions'
import Table from '../../Root/Table'
import { resetState } from '../../../redux/UpdateRoom/updateRoomActions' 
import { deleteRoomRequest } from '../../../redux/DeleteRoom/deleteRoomActions'
import UpdRoom from './modals/update/UpdRoom'

function Rooms() {

    const dispatch = useDispatch()

    const [openRoomModal, setOpenRoomModal] = useState(false)
    const [roomData, setRoomData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()

    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const updateError = useSelector((state) => state.updateRoomReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateRoomReducer.updated)

    const institute_id = Number(localStorage.getItem('institute_id'))

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
        if(deleteId !== null){
            dispatch(deleteRoomRequest(deleteId))
            setUpdate(false)
            setDeleteId(null)
        }
    }, [deleteId])

    const openModal = () => {
        setOpenRoomModal(true)
    }

    useEffect(() => {
        if(refresh){
            setRoomData([])
        }
        if (departmentsAdded) {
            if (rooms !== undefined && departments !== undefined && roomData.length === 0) {
                if(refresh){
                    setRoomData([])
                    setRefresh(false)
                }
                for (let i = 0; i < departments.length; i++) {
                    for (let j = 0; j < rooms.length; j++) {
                        if (rooms[j].department_id === departments[i].department_id) {
                            roomData.push([rooms[j].room_id , rooms[j].room_name, departments[i].department_name,
                                rooms[j].location, rooms[j].area])
                        }
                    }
                }
            }
        }
    }, [rooms, departments, refresh])

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getRoomsRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [institute_id, refresh])

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
                            roomsAdded && 
                            <Table 
                                columns={['No.', 'Room Name', 'Department', 'Floor/Location', 'Area']} 
                                rows={roomData} setUpdate={setUpdate} setDeleteId={setDeleteId} setData={setData}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AddRoom openRoomModal={openRoomModal} setOpenRoomModal={setOpenRoomModal} setRefresh={setRefresh} />
            </div>
            {
                update && <UpdRoom update={update} setUpdate={setUpdate} data={data}/>
            }
        </div>
    )
}

export default Rooms
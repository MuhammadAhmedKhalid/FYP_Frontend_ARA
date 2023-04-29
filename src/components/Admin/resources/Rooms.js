import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddRoom from './modals/AddRoom'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getRoomsRequest } from '../../../redux/GetRooms/getRoomsActions'
import Table from '../../Root/Table'
import { updateRoom, resetState } from '../../../redux/UpdateRoom/updateRoomActions' 
import { deleteRoomRequest } from '../../../redux/DeleteRoom/deleteRoomActions'

function Rooms() {

    const dispatch = useDispatch()

    const [openRoomModal, setOpenRoomModal] = useState(false)
    const [roomData, setRoomData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [updVal, setUpdVal] = useState('')
    const [oldVal, setOldVal] = useState(null)
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    const updateError = useSelector((state) => state.updateRoomReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateRoomReducer.updated)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteRoomRequest(deleteId))
            setUpdate(false)
            setDeleteId(null)
        }
    }, [deleteId])

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
        if(update){
            for(let i of rooms){
                if(i.room_id === oldVal[0]){
                    dispatch(updateRoom(i.room_id, i.department_id, updVal))
                }
            }
            setUpdVal('')
            setOldVal(null)
            setUpdate(false)
        }
    }, [update])

    const openModal = () => {
        setOpenRoomModal(true)
    }

    useEffect(() => {
        if (departmentsAdded) {
            if (rooms !== undefined && departments !== undefined && roomData.length === 0) {
                for (let i = 0; i < departments.length; i++) {
                    for (let j = 0; j < rooms.length; j++) {
                        if (rooms[j].department_id === departments[i].department_id) {
                            roomData.push([rooms[j].room_id , rooms[j].room_name, departments[i].department_name])
                        }
                    }
                }
            }
        }
    }, [rooms, departments, refresh])

    useEffect(() => {
        if(institute_id > 0){
            if(refresh){
                setRoomData([])
            }
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
                            roomsAdded && <Table columns={['No.', 'Room Name', 'Department']} rows={roomData} refresh={refresh} setRefresh={setRefresh}
                                            updVal={updVal} setUpdVal={setUpdVal} setUpdate={setUpdate} setOldVal={setOldVal} setDeleteId={setDeleteId}/>
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
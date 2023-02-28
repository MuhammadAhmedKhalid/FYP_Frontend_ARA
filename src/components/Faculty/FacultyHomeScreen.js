import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import FullCalendar from '../Root/FullCalendar'
import '../Styling/HomeScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import { getObjReqRequest } from '../../redux/GetObjectRequests/getObjReqActions'
import { getRoomRequest } from '../../redux/GetRoomRequests/getRoomReqActions'
import { getStaffRequest } from '../../redux/GetStaffRequest/getStaffReqActions'
import { getResourceTypesRequest } from '../../redux/GetResourceTypes/getResourceActions'
import { getRoomsRequest } from '../../redux/GetRooms/getRoomsActions'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import RequestedDataField from '../Root/RequestedDataField'

function FacultyHomeScreen() {

    const dispatch = useDispatch()

    const [greetings, setGreetings] = useState("")

    const facultyName = useSelector((state) => state.login.user.name)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    const requestedObjects = useSelector((state) => state.getObjRequests.obj_requests.data)
    const requestedObjectsAdded = useSelector((state) => state.getObjRequests.added)
    const requestedRooms = useSelector((state) => state.getRoomRequest.room_req.data)
    const requestedRoomsAdded = useSelector((state) => state.getRoomRequest.added)
    const requestedStaff = useSelector((state) => state.staffReqReducer.staff_req.data)
    const requestedStaffAdded = useSelector((state) => state.staffReqReducer.added)
    const objectsTypes = useSelector((state) => state.getResourceTypes.resource_types.data)
    const objectsTypesAdded = useSelector((state) => state.getResourceTypes.added)
    const rooms = useSelector((state) => state.getRooms.rooms.data)
    const roomsAdded = useSelector((state) => state.getRooms.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const faculty = useSelector((state) => state.getFaculty.faculty)
    const facultyAdded = useSelector((state) => state.getFaculty.added)

    useEffect(()=>{
        if(institute_id > 0){
            dispatch(getObjReqRequest(institute_id))
            dispatch(getRoomRequest(institute_id))
            dispatch(getStaffRequest(institute_id))
            dispatch(getResourceTypesRequest(institute_id))
            dispatch(getRoomsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
        }
    },[dispatch, institute_id])

    useEffect(() => {
        let date = new Date();
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).split(":")
        const setMessage = () => {
            if (time[0] >= 5 && time[0] <= 11) {
                setGreetings("Morning")
            } else if (time[0] >= 12 && time[0] <= 16) {
                setGreetings("Afternoon")
            } else if (time[0] >= 17 && time[0] <= 20) {
                setGreetings("Evening")
            } else {
                setGreetings("Night")
            }
        }
        setMessage()
    }, [])

    return (
        <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div>
                <FacultyNavbar />
                <div style={{ marginTop: '60px', padding: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: 'normal' }}>Good {greetings}</h2>
                    </div><h1 style={{ color: '#0E5E6F' }}>{facultyName}!</h1>
                </div>
                <div className='flexbox-container' style={{ justifyContent: 'space-between' }}>
                    <div className="gradient" style={{
                        width: 450,
                        height: 235,
                        backgroundColor: '#0E5E6F',
                        borderRadius: 15,
                        margin: '15px'
                    }}>
                        <div style={{ margin: '25px' }}>
                            <h2 style={{ fontWeight: 'normal' }}>Total Assigned Courses: <b>7</b></h2><br />
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Cloud Computing</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Software Project Management</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Human Computer Interaction</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>E-Commerce</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Marketing</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Programming Fundamentals</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Introduction to Software Engineering</h3>
                        </div>
                    </div>
                    <div style={{ justifyContent: 'flex-end' }}>
                        <FullCalendar
                            messages={{ next: '>', previous: '<', today: 'Current' }}
                            views={['week', 'day']}
                            style={{ height: 280, width: 700, padding: '15px' }}
                            defaultView="week"
                        />
                    </div>
                </div>
                <div style={{ marginTop: '25px', marginLeft: '25px' }}>
                    <h3 style={{ fontWeight: 'revert', color: 'black' }}>Request Applied For: </h3>
                </div>
                <div style={{
                        width: '98%',
                        height: 238,
                        margin: '15px',
                        border: '2px solid black',
                        overflow: 'auto'
                    }}>
                        <div className="grid-container">
                            <div className="col">
                                <p>Leave Request</p>
                            </div>
                            <div className="col">
                                <p>Object Request</p>
                                {
                                    requestedObjectsAdded ? 
                                        requestedObjects.map((requestedObject, index)=> 
                                        {
                                            if(objectsTypesAdded && departmentsAdded){
                                                for(let i = 0; i < objectsTypes.length; i++){
                                                    for(let j = 0; j < departments.length; j++){
                                                        if(objectsTypes[i].resource_type_id === requestedObject.resource_type_id && departments[j].department_id === requestedObject.department_id){
                                                            return <RequestedDataField index={index} name={objectsTypes[i].object_name + " - " + departments[j].department_name} 
                                                            date={requestedObject.date} startTime={requestedObject.startTime} endTime={requestedObject.endTime}/>
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        )
                                    : null
                                }
                            </div>
                            <div className="col">
                                <p>Room Request</p>
                                {
                                    requestedRoomsAdded ?
                                        requestedRooms.map((requestedRoom, index) =>
                                        {
                                            if(roomsAdded && departmentsAdded){
                                                for(let i = 0; i < rooms.length; i++){
                                                    for(let j = 0; j < departments.length; j++){
                                                        if(rooms[i].room_id === requestedRoom.room_id && departments[j].department_id === requestedRoom.department_id){
                                                            return <RequestedDataField index={index} name={rooms[i].room_name + " - " + departments[j].department_name} 
                                                            date={requestedRoom.date} startTime={requestedRoom.startTime} endTime={requestedRoom.endTime}/>
                                                        }
                                                    }
                                                }
                                            }
                                        })
                                    : null
                                }
                            </div>
                            <div className="col">
                                <p>Staff Request</p>
                                {
                                    requestedStaffAdded ?
                                        requestedStaff.map((staff, index) => 
                                        {
                                            if(facultyAdded && departmentsAdded){
                                                for(let i = 0; i < faculty.length; i++){
                                                    for(let j = 0; j < departments.length; j++){
                                                        if(faculty[i].faculty_id === staff.requested_faculty_id && departments[j].department_id === staff.department_id){
                                                            return <RequestedDataField index={index} name={faculty[i].name + " - " + departments[j].department_name} 
                                                            date={staff.date} startTime={staff.startTime} endTime={staff.endTime}/>
                                                        }
                                                    }
                                                }
                                            }
                                        })
                                    : null
                                }
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyHomeScreen
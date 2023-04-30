import React, { useEffect, useState } from 'react'
import '../Styling/HomeScreen.css'
import RequestedDataField from './RequestedDataField'
import { useSelector, useDispatch } from 'react-redux'
import { getObjReqRequest } from '../../redux/GetObjectRequests/getObjReqActions'
import { getRoomRequest } from '../../redux/GetRoomRequests/getRoomReqActions'
import { getStaffRequest } from '../../redux/GetStaffRequest/getStaffReqActions'
import { getResourceTypesRequest } from '../../redux/GetResourceTypes/getResourceActions'
import { getRoomsRequest } from '../../redux/GetRooms/getRoomsActions'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import { deleteRequestedObj } from '../../redux/DeleteObjectRequest/delObjReqActions'
import { deleteRequestedRoom } from '../../redux/DeleteRoomRequest/delRoomReqActions'
import { deleteRequestedStaff } from '../../redux/DeleteStaffRequest/delStaffReqActions'
import { getLeaveRequest } from '../../redux/GetLeaveRequests/getLeaveRequestActions'
import { deleteLeaveRequest } from '../../redux/DeleteLeaveRequest/deleteLeaveRequestActions'
 
function RequestedData() {

    const dispatch = useDispatch()

    const [del, setDel] = useState(false)
    const [req_id, setReq_id] = useState(0)
    const [resource, setResource] = useState('')

    const institute_id = localStorage.getItem('institute_id')
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
    const user_id = localStorage.getItem('user_id')
    const name = localStorage.getItem('name')
    const isAdmin = localStorage.getItem('is_admin')
    const requestedLeaves = useSelector((state) => state.leaveReqReducer.requestedLeaves.data)
    const requestedLeavesAdded = useSelector((state) => state.leaveReqReducer.added)

    useEffect(()=>{
        if(del){
            setDel(false)
            switch(resource){
                case 'OR':
                    dispatch(deleteRequestedObj(req_id))
                    break;
                case 'RR':
                    dispatch(deleteRequestedRoom(req_id))
                    break;
                case 'SR':
                    dispatch(deleteRequestedStaff(req_id))
                    break;
                case 'LR':
                    dispatch(deleteLeaveRequest(req_id))
                    break;
                default:
                    break;
            }
        }
    },[del])

    useEffect(()=>{
        if(institute_id > 0){
            dispatch(getObjReqRequest(institute_id))
            dispatch(getRoomRequest(institute_id))
            dispatch(getStaffRequest(institute_id))
            dispatch(getResourceTypesRequest(institute_id))
            dispatch(getRoomsRequest(institute_id))
            dispatch(getFacultyRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
            dispatch(getLeaveRequest(institute_id))
        }
    },[dispatch, institute_id])

    return (
        <div>
            <div style={{ marginTop: '15px', marginLeft: '15px' }}>
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
                        {
                            requestedLeavesAdded ? 
                            requestedLeaves.map((leave, index) =>
                            {
                                if(facultyAdded && departmentsAdded){
                                    let from;
                                    for(let i = 0; i < faculty.length; i++){
                                        if(faculty[i].faculty_id === leave.faculty_id){
                                            from = faculty[i].name
                                        }
                                        for(let j = 0; j < departments.length; j++){
                                            if(faculty[i].faculty_id === leave.faculty_id
                                                && ((name === faculty[i].name)||(isAdmin))
                                                && departments[j].department_id === faculty[i].department_id){
                                                return <RequestedDataField index={index} 
                                                name={faculty[i].name} 
                                                details={"Department: " + departments[j].department_name}
                                                date={leave.date} startTime={leave.startTime} endTime={leave.endTime}
                                                setDel={setDel} setReq_id={setReq_id} id={leave.leaveId} setResource={setResource}
                                                resource_type={'LR'}/>
                                            }
                                            
                                        }
                                    }
                                }
                            }) : null
                        }
                    </div>
                    <div className="col">
                        <p>Object Request</p>
                        {
                            requestedObjectsAdded ? 
                                requestedObjects.map((requestedObject, index)=> 
                                {
                                    if(objectsTypesAdded && departmentsAdded && roomsAdded && facultyAdded){
                                        for(let i = 0; i < objectsTypes.length; i++){
                                            for(let j = 0; j < departments.length; j++){
                                                for(let k = 0; k < rooms.length; k++){
                                                    for(let l = 0; l < faculty.length; l++){
                                                        if(objectsTypes[i].resource_type_id === requestedObject.resource_type_id 
                                                            && departments[j].department_id === requestedObject.department_id
                                                            && rooms[k].room_id === requestedObject.room_id
                                                            && faculty[l].user.user_id === requestedObject.user_id
                                                            && (user_id === requestedObject.user_id || isAdmin)){
                                                            return <RequestedDataField index={index} 
                                                            name={objectsTypes[i].object_name} 
                                                            details={"Department: " + departments[j].department_name + " - Room: " + rooms[k].room_name}
                                                            from={"By: " + faculty[l].name}
                                                            date={requestedObject.date} startTime={requestedObject.startTime} endTime={requestedObject.endTime}
                                                            setDel={setDel} setReq_id={setReq_id} id={requestedObject.obj_req_id} setResource={setResource}
                                                            resource_type={'OR'}/>
                                                        }
                                                    }
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
                                    if(roomsAdded && departmentsAdded && facultyAdded){
                                        for(let i = 0; i < rooms.length; i++){
                                            for(let j = 0; j < departments.length; j++){
                                                for(let k = 0; k < faculty.length; k++){
                                                    if(rooms[i].room_id === requestedRoom.room_id 
                                                        && departments[j].department_id === requestedRoom.department_id
                                                        && faculty[k].user.user_id === requestedRoom.user_id
                                                        && (user_id === requestedRoom.user_id || isAdmin)){
                                                        return <RequestedDataField index={index} 
                                                        name={rooms[i].room_name} 
                                                        details={"Department: " + departments[j].department_name}
                                                        from={"By: " + faculty[k].name}
                                                        date={requestedRoom.date} startTime={requestedRoom.startTime} endTime={requestedRoom.endTime}
                                                        setDel={setDel} setReq_id={setReq_id} id={requestedRoom.room_req_id} setResource={setResource}
                                                        resource_type={'RR'}/>
                                                    }
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
                                        let from;
                                        let forFaculty;
                                        for(let i = 0; i < faculty.length; i++){
                                            if(faculty[i].user.user_id === staff.user_id){
                                                from = faculty[i].user.name
                                            }
                                            if(faculty[i].faculty_id === staff.requested_faculty_id){
                                                forFaculty = faculty[i].user.name
                                            }
                                            if (from !== undefined && forFaculty !== undefined){
                                                for(let j = 0; j < departments.length; j++){
                                                    if(departments[j].department_id === staff.department_id
                                                        && (user_id === staff.user_id || isAdmin)){
                                                        return <RequestedDataField index={index} 
                                                        name={forFaculty} 
                                                        details={"Department: " + departments[j].department_name}
                                                        from={"By: " + from}
                                                        date={staff.date} startTime={staff.startTime} endTime={staff.endTime}
                                                        setDel={setDel} setReq_id={setReq_id} id={staff.staff_req_id} setResource={setResource}
                                                        resource_type={'SR'}/>
                                                    }
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
    )
}

export default RequestedData
import React, { useEffect } from 'react'
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
 
function RequestedData() {

    const dispatch = useDispatch()

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
                                                            && faculty[l].user.user_id === requestedObject.user_id){
                                                            return <RequestedDataField index={index} 
                                                            name={objectsTypes[i].object_name} 
                                                            details={"Department: " + departments[j].department_name + " - Room: " + rooms[k].room_name}
                                                            from={"By: " + faculty[l].name}
                                                            date={requestedObject.date} startTime={requestedObject.startTime} endTime={requestedObject.endTime}/>
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
                                                        && faculty[k].user.user_id === requestedRoom.user_id){
                                                        return <RequestedDataField index={index} 
                                                        name={rooms[i].room_name} 
                                                        details={"Department: " + departments[j].department_name}
                                                        from={"By: " + faculty[k].name}
                                                        date={requestedRoom.date} startTime={requestedRoom.startTime} endTime={requestedRoom.endTime}/>
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
                                        for(let i = 0; i < faculty.length; i++){
                                            if(faculty[i].user.user_id === staff.user_id){
                                                from = faculty[i].user.name
                                            }
                                            for(let j = 0; j < departments.length; j++){
                                                if(faculty[i].faculty_id === staff.requested_faculty_id 
                                                    && departments[j].department_id === staff.department_id){
                                                    return <RequestedDataField index={index} 
                                                    name={faculty[i].name} 
                                                    details={"Department: " + departments[j].department_name}
                                                    from={"By: " + from}
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
    )
}

export default RequestedData
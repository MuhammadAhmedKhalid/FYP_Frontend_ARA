import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
import { getCourseRequest } from '../../redux/GetCourse/getCourseActions'
import { getRoomsRequest } from '../../redux/GetRooms/getRoomsActions'
import { getBatchesRequest } from '../../redux/GetBatches/getBatchesActions'

function ShowEventDetials(props) {

  const { details, showDetailModal, setShowDetailModal } = props

  const dispatch = useDispatch()

  const batches = useSelector((state) => state.getBatchesReducer.batches.data)
  const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
  const departments = useSelector((state) => state.getDepartments.departments.data)
  const departmentsAdded = useSelector((state) => state.getDepartments.added)
  const rooms = useSelector((state) => state.getRooms.rooms.data)
  const roomsAdded = useSelector((state) => state.getRooms.added)
  const courses = useSelector((state) => state.getCourseReducer.courses)
  const coursessAdded = useSelector((state) => state.getCourseReducer.added)
  const institute_id = localStorage.getItem('institute_id')

  const [courseName, setCourseName] = useState(" ")
  const [batchYear, setBatchYear] = useState(" ")
  const [departmentName, setDepartmentName] = useState(" ")
  const [roomName, setRoomName] = useState(" ")

  useEffect(() => {
    if(institute_id > 0){
      dispatch(getBatchesRequest(institute_id))
      dispatch(getDepartmentsRequest(institute_id))
      dispatch(getCourseRequest(institute_id))
      dispatch(getRoomsRequest(institute_id))
  }
  }, [institute_id, dispatch])

  useEffect(() => {
    if(batchesAdded && departmentsAdded && roomsAdded && coursessAdded && details !== undefined){
      for(let i of batches){
        if(i.batchId === details.batchId){
          setBatchYear(i.batchYear)
        }
      }
      for(let i of departments){
        if(i.department_id === details.department_id){
          setDepartmentName(i.department_name)
        }
      }
      for(let i of rooms){
        if(i.room_id === details.room_id){
          setRoomName(i.room_name)
        }
      }
      for(let i of courses){
        if(i.course_id === details.course_id){
          setCourseName(i.course_name)
        }
      }
    }
  }, [batchesAdded, departmentsAdded, roomsAdded, coursessAdded, details])

  const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, .7)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
  };

  const closeModal = () => {
    setShowDetailModal(false)
  }

  return (
    <div>
        <Modal
          className='modal-content'
          style={customStyles}
          isOpen={showDetailModal}
          onRequestClose={() => closeModal()}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Event Details</h2>
                    <h3 style={{
                            fontWeight: 'normal', fontSize: '17px', color: 'black', marginRight: '3px', marginTop: '10px', textAlign: 'center'
                        }}>
                          {
                            details !== undefined ? 
                            <div>
                              Course: {courseName}<br/>
                              Batch: {batchYear}-{departmentName}<br/>
                              Day: {details.day}<br/>
                              Room: {roomName}<br/>
                              Semester type: {details.semesterType}<br/>
                              Date: {details.date}<br/>
                              Time: {details.startTime}-{details.endTime}<br/>
                            </div> : null
                          }
                    </h3>
                    <center><button className='modal-btn' style={{marginTop: '20px'}} onClick={() => closeModal()}>Close</button></center>
                </div>
        </Modal>
    </div>
  )
}

export default ShowEventDetials
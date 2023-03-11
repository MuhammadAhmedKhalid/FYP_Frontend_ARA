import React, { useEffect,useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchesRequest } from '../../../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../../../redux/GetDepartments/getDepartmentsActions'
import { getFacultyRequest } from '../../../../redux/GetFaculty/getFacultyActions'
import { getCourseRequest } from '../../../../redux/GetCourse/getCourseActions'

function AssignCourse(props) {

  const { openAssignCourseModal, setOpenAssignCourseModal } = props

  const dispatch = useDispatch()

  const institute_id = useSelector((state) => state.login.user.institute_id)
  const batches = useSelector((state) => state.getBatchesReducer.batches.data)
  const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
  const departments = useSelector((state) => state.getDepartments.departments.data)
  const departmentsAdded = useSelector((state) => state.getDepartments.added)

  const [batchesData, setBatchesData] = useState([])

  const [assignCourse, setAssignCourse] = useState({
    batchId: "",
    department_id: "",
    institute_id
})

  useEffect(() => {
    if(batchesAdded && departmentsAdded){
      setBatchesData([])
      for(let i in batches){
        for(let j in departments){
          if(batches[i].department_id === departments[j].department_id){
            setBatchesData(batchesData => [...batchesData, {batchId: batches[i].batchId, name: `${batches[i].batchYear} - ${departments[j].department_name}`, 
          department_id: departments[j].department_id}])
          }
        }
      }
    }
  }, [batchesAdded, departmentsAdded])

  useEffect(() => {
    if(institute_id > 0){
        dispatch(getBatchesRequest(institute_id))
        dispatch(getDepartmentsRequest(institute_id))
        dispatch(getFacultyRequest(institute_id))
        dispatch(getCourseRequest(institute_id))
    }
}, [institute_id, dispatch])

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
        setOpenAssignCourseModal(false)
      }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleBatchChange = (e) => {
    const batch = e.target.value
    for(let i of batchesData){
      if(i.name === e.target.value){
        setAssignCourse({ ...assignCourse, batchId: i.batchId, department_id: i.department_id})
      }
    }
  }
  
  return (
    <div>
      <Modal
            className='modal-content'
            style={customStyles}
            isOpen={openAssignCourseModal}
            onRequestClose={() => closeModal()}>
            <div className='center flexbox-container-y'>
                <h2 style={{ color: "#115868", fontSize: 20 }}>Assign Course</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ margin: '3px' }} className='flexbox-container-y'>
                      <h3 style={{
                          fontWeight: 'normal', color: 'gray', marginRight: '3px'
                      }}>Batch</h3>
                      <select required className='dropdown' onChange={handleBatchChange}>
                      <option></option>
                          {
                              batchesData.length !== 0 ? batchesData.map(batch => 
                                  <option key={batch.batchId}>{batch.name}</option>) : null
                          }
                      </select>
                  </div>
                </form>
            </div>
        </Modal>
    </div>
  )
}

export default AssignCourse
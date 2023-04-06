import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../Styling/InstituteSchedule.css'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchesRequest } from '../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../redux/GetDepartments/getDepartmentsActions'
 
function InstituteSchedule() {

  const dispatch = useDispatch()

  const institute_id = useSelector((state) => state.login.user.institute_id)
  const batches = useSelector((state) => state.getBatchesReducer.batches.data)
  const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
  const departments = useSelector((state) => state.getDepartments.departments.data)
  const departmentsAdded = useSelector((state) => state.getDepartments.added)

  const localizer = momentLocalizer(moment)

  const options = ["Spring", "Fall"];

  const [selectedSemesterType, setselectedSemesterType] = useState(options[0]);
  const [semesterTypeChange, setSemesterTypeChange] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState("")
  const [batchData, setBatchData] = useState([])

  useEffect(() => {
    dispatch(getBatchesRequest(institute_id))
    dispatch(getDepartmentsRequest(institute_id))
  }, [dispatch, institute_id])

  useEffect(() => {
    if(batchesAdded && departmentsAdded){
      setBatchData([])
      for(let i of batches){
        for(let j of departments){
          if(i.department_id === j.department_id){
            setBatchData(batchData => [...batchData, [i.batchYear, j.department_name]])
          }
        }
      }
    }
  }, [batchesAdded, departmentsAdded])

  useEffect(() => {
    if(selectedBatch.length > 0){
      console.log(selectedSemesterType)
      console.log(selectedBatch)
    }
  }, [semesterTypeChange, selectedBatch])

  const handleOptionClick = (option) => {
    setselectedSemesterType(option);
    setSemesterTypeChange(!semesterTypeChange)
  };

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value)
  }

  return (
    <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div><AdminNavbar/></div>
            <form>
              <div style={{ marginTop: '50px', marginBottom: '0px' }} className='flexbox-container-y'>
              <h3 style={{fontWeight: 'normal', color: 'gray', marginRight: '3px'}}>Choose Batch</h3>
                <select className='dropdown' onChange={handleBatchChange}>
                  <option/>
                  {
                    batchData.length !== 0 ? batchData.map((batch, index) => 
                      <option key={index}>{batch.join(' - ')}</option>
                      ) : null
                  }
                </select>
              </div>
            </form>
            <div className="options-wrapper" style={{ marginBottom: '30px' }}>
              <div className="options-container">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${selectedSemesterType === option ? "selected" : ""}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <Calendar
                style={{ height: 500, margin: "100px", marginTop: "0px" }}
                messages={{ today: 'Current' }}
                localizer={localizer}
                startAccessor="startDate"
                endAccessor="endDate"
            />
        </div>
  )
}

export default InstituteSchedule
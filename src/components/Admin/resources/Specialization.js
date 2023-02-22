import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddSpecialization from './modals/AddSpecialization'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { getSpecializationRequest } from '../../../redux/GetSpecialization/getSpecializationActions'

function Specialization() {

    const dispatch = useDispatch()

    const [openSpecializationModal, setOpenSpecializationModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const specializations = useSelector((state) => state.getSpecializationReducer.specializations)
    const specializationsAdded = useSelector((state) => state.getSpecializationReducer.added)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    
    const [rowData, setRowData] = useState([])

    useEffect(()=>{
        if(specializationsAdded && departmentsAdded && rowData.length !== specializations.length){
            for(let i=0; i<specializations.length; i++){
                for(let j=0; j<departments.length; j++){
                    if(departments[j].department_id === specializations[i].department_id){
                        rowData.push([specializations[i].specialization_name, departments[j].department_name])
                    }
                }
            }
        }
    }, [specializationsAdded, departmentsAdded])

    useEffect(()=>{
        if(institute_id > 0){
            dispatch(getSpecializationRequest(institute_id))
        }
    }, [refresh, institute_id])

    const openModal = () => {
        setOpenSpecializationModal(true)
    }

  return (
    <div>
        <div className="flexbox-container-y white-bg-y">
            <div>
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ADD SPECIALIZATION</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>SPECIALIZATIONS LIST</h2>
                </div>
                <center>
                    {
                        specializationsAdded && <Table columns={['No.', 'Specialization', 'Department']} rows={rowData}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddSpecialization openSpecializationModal={openSpecializationModal} setOpenSpecializationModal={setOpenSpecializationModal} setRefresh={setRefresh} />
        </div>
    </div>
  )
}

export default Specialization
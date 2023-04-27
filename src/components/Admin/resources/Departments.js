import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddDepartment from './modals/AddDepartment'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import Table from '../../Root/Table'
import { updateDepartment, resetState } from '../../../redux/UpdateDepartment/updateDeptActions'

function Departments() {

    const dispatch = useDispatch()

    const [openDepartmentModal, setOpenDepartmentModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [updVal, setUpdVal] = useState('')
    const [oldVal, setOldVal] = useState('')
    const [update, setUpdate] = useState(false)

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_name = useSelector((state) => state.login.user.institute_name)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    const updateError = useSelector((state) => state.updateDepartmentReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateDepartmentReducer.updated)

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
            for(let i of departments){
                if(i.department_name === oldVal){
                    dispatch(updateDepartment(i.department_id, updVal))
                }
            }
            setUpdVal('')
            setOldVal('')
            setUpdate(false)
        }
    }, [update])

    useEffect(()=>{
        if(departmentsAdded && rowData.length !== departments.length){
            for(let i=0; i<departments.length; i++){
                rowData.push([departments[i].department_name, institute_name])
            }
        }
    },[departmentsAdded, refresh])

    const openModal = () => {
        setOpenDepartmentModal(true)
    }
    useEffect(() => {
        if(institute_id > 0){
            if(refresh){
                setRowData([])
            }
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [refresh, institute_id])

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '30px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD DEPARTMENT</button>
                    </div>
                    <div style={{ marginTop: '30px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>DEPARTMENTS</h2>
                    </div>
                    <center>
                        {
                            departmentsAdded && <Table columns={['No.', 'Department Name', 'Institute']} rows={rowData} refresh={refresh} setRefresh={setRefresh}
                            updVal={updVal} setUpdVal={setUpdVal} setUpdate={setUpdate} setOldVal={setOldVal}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AddDepartment openDepartmentModal={openDepartmentModal} setOpenDepartmentModal={setOpenDepartmentModal}/>
            </div>
        </div>
    )
}

export default Departments
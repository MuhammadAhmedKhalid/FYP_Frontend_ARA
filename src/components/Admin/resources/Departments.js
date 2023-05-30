import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddDepartment from './modals/AddDepartment'
import { useSelector, useDispatch } from 'react-redux'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import Table from '../../Root/Table'
import { updateDepartment, resetState } from '../../../redux/UpdateDepartment/updateDeptActions'
import { deleteDepartmentRequest } from '../../../redux/DeleteDepartment/deleteDeptActions'

function Departments() {

    const dispatch = useDispatch()

    const [openDepartmentModal, setOpenDepartmentModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [updVal, setUpdVal] = useState('')
    const [oldVal, setOldVal] = useState(null)
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_id = Number(localStorage.getItem('institute_id'))
    const updateError = useSelector((state) => state.updateDepartmentReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateDepartmentReducer.updated)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteDepartmentRequest(deleteId))
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
            for(let i of departments){
                if(i.department_id === oldVal[0]){
                    dispatch(updateDepartment(i.department_id, updVal))
                    break
                }
            }
            setUpdVal('')
            setOldVal(null)
            setUpdate(false)
        }
    }, [update])

    useEffect(()=>{
        if(departmentsAdded && rowData.length !== departments.length){
            if(refresh){
                setRowData([])
                setRefresh(false)
            }
            for(let i=0; i<departments.length; i++){
                rowData.push([departments[i].department_id , departments[i].department_name])
            }
        }
    },[departmentsAdded, refresh, departments])


    const openModal = () => {
        setOpenDepartmentModal(true)
    }

    useEffect(() => {
        if(institute_id > 0){
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
                            departmentsAdded && <Table columns={['No.', 'Department Name']} rows={rowData} refresh={refresh} setRefresh={setRefresh}
                            updVal={updVal} setUpdVal={setUpdVal} setUpdate={setUpdate} setOldVal={setOldVal} setDeleteId={setDeleteId}
                            setRowData={setRowData}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AddDepartment openDepartmentModal={openDepartmentModal} setOpenDepartmentModal={setOpenDepartmentModal} setRefresh={setRefresh}/>
            </div>
        </div>
    )
}

export default Departments
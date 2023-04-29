import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddBatches from './modals/AddBatches'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchesRequest } from '../../../redux/GetBatches/getBatchesActions'
import { getDepartmentsRequest } from '../../../redux/GetDepartments/getDepartmentsActions'
import { resetState, updateBatch } from '../../../redux/UpdateBatch/updateBatchActions'
import { deleteBatchRequest } from '../../../redux/DeleteBatch/deleteBatchActions'

function Batches() {

    const dispatch = useDispatch()

    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_name = useSelector((state) => state.login.user.institute_name)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    const updateError = useSelector((state) => state.updateBatchReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updateBatchReducer.updated)

    const [openBatchModal, setOpenBatchModal] = useState(false)
    const [rowData, setRowData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [updVal, setUpdVal] = useState('')
    const [oldVal, setOldVal] = useState(null)
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteBatchRequest(deleteId))
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
            for(let i of batches){
                if(i.batchId === oldVal[0]){
                    dispatch(updateBatch(i.department_id, i.batchId, updVal))
                }
            }
            setUpdVal('')
            setOldVal(null)
            setUpdate(false)
        }
    }, [update])

    useEffect(()=>{
        if(batchesAdded && rowData.length !== batches.length && departmentsAdded){
            for(let i=0; i<batches.length; i++){
                for(let j in departments){
                    if(departments[j].department_id == batches[i].department_id){
                        rowData.push([batches[i].batchId , (batches[i].batchYear).toString(), departments[j].department_name])
                    }
                }
            }
        }
    },[batchesAdded, batches, institute_name, rowData, departments, departmentsAdded, refresh])

    useEffect(() => {
        if(institute_id > 0){
            if(refresh){
                setRowData([])
            }
            dispatch(getBatchesRequest(institute_id))
            dispatch(getDepartmentsRequest(institute_id))
        }
    }, [refresh, institute_id])

    const openModal = () => {
        setOpenBatchModal(true)
    }

    return (
        <div>
            <div className="flexbox-container-y white-bg-y">
                <div>
                    <AdminNavBar />
                    <AdminIcon />
                    <div style={{ marginTop: '25px' }} className='center'>
                        <button className='modal-btn-w' onClick={openModal}>ADD BATCH</button>
                    </div>
                    <div style={{ marginTop: '25px' }} className='center'>
                        <h2 style={{ color: '#0E5E6F' }}>BACTHES LIST</h2>
                    </div>
                    <center>
                        {
                            <Table columns={['No.', 'Batch Year', 'Department']} rows={rowData} refresh={refresh} setRefresh={setRefresh}
                                updVal={updVal} setUpdVal={setUpdVal} setUpdate={setUpdate} setOldVal={setOldVal} setDeleteId={setDeleteId}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AddBatches openBatchModal={openBatchModal} setOpenBatchModal={setOpenBatchModal}/>
            </div>
        </div>
    )
}

export default Batches
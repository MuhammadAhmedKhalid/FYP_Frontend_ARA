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
import UpdBatch from './modals/update/UpdBatch'

function Batches() {

    const dispatch = useDispatch()

    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const departments = useSelector((state) => state.getDepartments.departments.data)
    const departmentsAdded = useSelector((state) => state.getDepartments.added)
    const institute_id = Number(localStorage.getItem('institute_id'))

    const [openBatchModal, setOpenBatchModal] = useState(false)
    const [rowData, setRowData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deleteBatchRequest(deleteId))
            setUpdate(false)
            setDeleteId(null)
        }
    }, [deleteId])

    useEffect(()=>{
        if(refresh){
            setRowData([])
        }
        if(batchesAdded && rowData.length === 0 && departmentsAdded){
            if(refresh){
                setRowData([])
                setRefresh(false)
            }
            for(let i=0; i<batches.length; i++){
                for(let j in departments){
                    if(departments[j].department_id === batches[i].department_id){
                        rowData.push([batches[i].batchId , (batches[i].batchYear).toString(), departments[j].department_name,
                        batches[i].batchCode, batches[i].section, batches[i].numOfStudents])
                    }
                }
            }
        }
    },[batches, departments, refresh])

    useEffect(() => {
        if(institute_id > 0){
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
                            <Table 
                                columns={['No.', 'Batch Year', 'Department', 'Batch Code', 'Section', 'No. of students']} 
                                rows={rowData} setUpdate={setUpdate} setDeleteId={setDeleteId} setData={setData}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AddBatches openBatchModal={openBatchModal} setOpenBatchModal={setOpenBatchModal} setRefresh={setRefresh}/>
            </div>
            {
                update && <UpdBatch update={update} setUpdate={setUpdate} data={data}/>
            }
        </div>
    )
}

export default Batches
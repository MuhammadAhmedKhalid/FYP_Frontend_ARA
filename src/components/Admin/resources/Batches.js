import React, { useState, useEffect } from 'react'
import AdminIcon from '../AdminIcon'
import AdminNavBar from '../AdminNavbar'
import AddBatches from './modals/AddBatches'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchesRequest } from '../../../redux/GetBatches/getBatchesActions'

function Batches() {

    const dispatch = useDispatch()

    const batches = useSelector((state) => state.getBatchesReducer.batches.data)
    const batchesAdded = useSelector((state) => state.getBatchesReducer.added)
    const institute_name = useSelector((state) => state.login.user.institute_name)
    const institute_id = useSelector((state) => state.login.user.institute_id)

    const [openBatchModal, setOpenBatchModal] = useState(false)
    const [rowData, setRowData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{
        if(batchesAdded && rowData.length !== batches.length){
            for(let i=0; i<batches.length; i++){
                rowData.push([batches[i].batchYear, institute_name])
            }
        }
    },[batchesAdded, batches, institute_name, rowData])

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getBatchesRequest(institute_id))
        }
    }, [refresh, institute_id, dispatch])

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
                            <Table columns={['No.', 'Batch Year', 'Department']} rows={rowData}/>
                        }
                    </center>
                </div>
            </div>
            <div>
                <AddBatches openBatchModal={openBatchModal} setOpenBatchModal={setOpenBatchModal} setRefresh={setRefresh}/>
            </div>
        </div>
    )
}

export default Batches
import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddPosition from './modals/AddDesignation'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getPositionRequest } from '../../../redux/GetPosition/getPositionActions'
import { resetState } from '../../../redux/UpdatePosition/updatePositionActions'
import { deletePositionRequest } from '../../../redux/DeletePosition/deletePositionActions'
import UpdDesignation from './modals/update/UpdDesignation'

function Designations() {

    const dispatch = useDispatch()

    const [openPositionModal, setOpenPositionModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [rowData, setRowData] = useState([])
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState()
   
    const positions = useSelector((state) => state.getPositionReducer.positions)
    const positionsAdded = useSelector((state) => state.getPositionReducer.added)
    const institute_id = Number(localStorage.getItem('institute_id'))
    const updateError = useSelector((state) => state.updatePositionReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updatePositionReducer.updated)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deletePositionRequest(deleteId))
            alert('Deleted successfully.')
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

    useEffect(()=>{
        if(positionsAdded && rowData.length !== positions.length){
            if(refresh){
                setRowData([])
                setRefresh(false)
            }
            for(let i=0; i<positions.length; i++){
                rowData.push([positions[i].position_id , positions[i].position_name])
            }
        }
    }, [positionsAdded, refresh, positions])

    useEffect(()=>{
        if(institute_id > 0){
            dispatch(getPositionRequest(institute_id))
        }
    },[refresh, institute_id])

    const openModal = () => {
        setOpenPositionModal(true)
    }

  return (
    <div>
        <div className="flexbox-container-y white-bg-y">
            <div>
                <AdminNavBar />
                <AdminIcon />
                <div style={{ marginTop: '30px' }} className='center'>
                    <button className='modal-btn-w' onClick={openModal}>ADD DESIGNATION</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>DESIGNATIONS LIST</h2>
                </div>
                <center>
                    {
                        positionsAdded && 
                        <Table columns={['No.', 'Designation']} rows={rowData} setUpdate={setUpdate} setDeleteId={setDeleteId} setData={setData}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddPosition openPositionModal={openPositionModal} setOpenPositionModal={setOpenPositionModal} setRefresh={setRefresh}/>
        </div>
        {
            update && <UpdDesignation update={update} setUpdate={setUpdate} data={data}/>
        }
    </div>
  )
}

export default Designations
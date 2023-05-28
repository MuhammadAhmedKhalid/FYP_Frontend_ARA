import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddPosition from './modals/AddPosition'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getPositionRequest } from '../../../redux/GetPosition/getPositionActions'
import { resetState, updatePosition } from '../../../redux/UpdatePosition/updatePositionActions'
import { deletePositionRequest } from '../../../redux/DeletePosition/deletePositionActions'

function Positions() {

    const dispatch = useDispatch()

    const [openPositionModal, setOpenPositionModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [updVal, setUpdVal] = useState('')
    const [rowData, setRowData] = useState([])
    const [oldVal, setOldVal] = useState(null)
    const [update, setUpdate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
   
    const positions = useSelector((state) => state.getPositionReducer.positions)
    const positionsAdded = useSelector((state) => state.getPositionReducer.added)
    const institute_name = localStorage.getItem('institute_name')
    const institute_id = Number(localStorage.getItem('institute_id'))
    const updateError = useSelector((state) => state.updatePositionReducer.error)
    const updatedSuccessfully = useSelector((state) => state.updatePositionReducer.updated)

    useEffect(() => {
        if(deleteId !== null){
            dispatch(deletePositionRequest(deleteId))
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
            for(let i of positions){
                if(i.position_id === oldVal[0]){
                    dispatch(updatePosition(i.position_id, updVal))
                }
            }
            setUpdVal('')
            setOldVal(null)
            setUpdate(false)
        }
    }, [update])

    useEffect(()=>{
        if(positionsAdded && rowData.length !== positions.length){
            for(let i=0; i<positions.length; i++){
                rowData.push([positions[i].position_id , positions[i].position_name])
            }
        }
    }, [positionsAdded, refresh])

    useEffect(()=>{
        if(institute_id > 0){
            if(refresh){
                setRowData([])
            }
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
                    <button className='modal-btn-w' onClick={openModal}>ADD POSITION</button>
                </div>
                <div style={{ marginTop: '30px' }} className='center'>
                    <h2 style={{ color: '#0E5E6F' }}>POSITIONS LIST</h2>
                </div>
                <center>
                    {
                        positionsAdded && <Table columns={['No.', 'Position']} rows={rowData} refresh={refresh} setRefresh={setRefresh}
                                            updVal={updVal} setUpdVal={setUpdVal}  setUpdate={setUpdate} setOldVal={setOldVal} setDeleteId={setDeleteId}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddPosition openPositionModal={openPositionModal} setOpenPositionModal={setOpenPositionModal}/>
        </div>
    </div>
  )
}

export default Positions
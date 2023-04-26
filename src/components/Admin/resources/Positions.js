import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavbar'
import AdminIcon from '../AdminIcon'
import AddPosition from './modals/AddPosition'
import Table from '../../Root/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getPositionRequest } from '../../../redux/GetPosition/getPositionActions'

function Positions() {

    const dispatch = useDispatch()

    const [openPositionModal, setOpenPositionModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
   
    const positions = useSelector((state) => state.getPositionReducer.positions)
    const positionsAdded = useSelector((state) => state.getPositionReducer.added)
    const institute_name = useSelector((state) => state.login.user.institute_name)
    const institute_id = useSelector((state) => state.login.user.institute_id)

    const [rowData, setRowData] = useState([])

    useEffect(()=>{
        if(positionsAdded && rowData.length !== positions.length){
            for(let i=0; i<positions.length; i++){
                rowData.push([positions[i].position_name, institute_name])
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
                        positionsAdded && <Table columns={['No.', 'Position', 'Institute']} rows={rowData} refresh={refresh} setRefresh={setRefresh}/>
                    }
                </center>
            </div>
        </div>
        <div>
            <AddPosition openPositionModal={openPositionModal} setOpenPositionModal={setOpenPositionModal} setRefresh={setRefresh} />
        </div>
    </div>
  )
}

export default Positions
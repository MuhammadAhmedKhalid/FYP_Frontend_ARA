import React, { useState, useEffect } from 'react'
import '../Styling/TableStyles.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextField from '@material-ui/core/TextField'
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux'
import { getPositionRequest } from '../../redux/GetPosition/getPositionActions'

function Table(props) {

    const dispatch = useDispatch()

    const { columns, rows, refresh, setRefresh, uneditable, multiEdit, updVal, setUpdVal } = props

    const positions = useSelector((state) => state.getPositionReducer.positions)
    const positionsAdded = useSelector((state) => state.getPositionReducer.added)
    const institute_id = useSelector((state) => state.login.user.institute_id)
    
    useEffect(() => {
        if(institute_id > 0 && multiEdit){
            dispatch(getPositionRequest(institute_id))
        }
    }, [institute_id, multiEdit])

    const [editableRow, setEditableRow] = useState(null);
    // const [updVal, setUpdVal] = useState('')

    const handleEdit = (index) => {
        setEditableRow(index);
    }

    const handleInputChange = (text, rowIndex, cellIndex) => {
        setUpdVal(text)
      };

    const handleDelete = (index) => {
        console.log(rows[index][0])
        alert('Deleted successfully.')
        handleRefresh()
    }

    const handleCheck = () => {
        setEditableRow(null);
        alert('Updated successfully.')
        handleRefresh()
    }

    const handleRefresh = () => {
        setRefresh(true);
        setEditableRow(null);
        setTimeout(() => {
            setRefresh(false);
          }, 1000);
    }

    return (
        <div>
            {refresh && (<div className="loading-overlay"><div className="loading-icon"></div></div>)}
            <div className='refreshContainer'><RefreshIcon onClick={handleRefresh} className='refreshButton'/></div>
            <div className="table-container" style={{ marginTop: '7px' }}>
                
                <table className="table">
                    <thead className="fixed-header">
                        <tr>
                            {
                                columns.map((column, index) => (<th key={index}>{column}</th>))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((cellData, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    {
                                        cellData.map((data, dataIndex)=>(
                                            <td key={dataIndex}>
                                                {
                                                    multiEdit === true ?( (editableRow === index) && (dataIndex === 0 || dataIndex === 1 || dataIndex === 5) ? 
                                                    (editableRow === index && dataIndex === 5) ? 
                                                    <select className='editableDropdown'>
                                                        <option></option>
                                                        {
                                                            positionsAdded && positions.length !== 0 ? positions.map(position =>
                                                                <option key={position.position_id}>{position.position_name}</option>) : null
                                                        }
                                                    </select> :
                                                    <TextField value={updVal} placeholder={data} onChange={(event) => handleInputChange(event.target.value, index, 1)} 
                                                            size='small' variant="outlined" type='text'/>: 
                                                            data)
                                                        : editableRow === index && dataIndex === 0 ? 
                                                        <TextField value={updVal} placeholder={data} onChange={(event) => handleInputChange(event.target.value, index, 1)} 
                                                            size='small' variant="outlined" type='text'/>: 
                                                            data
                                                }                                                
                                                <DeleteIcon onClick={() => handleDelete(index)} className='deleteButton'/>
                                                {
                                                    editableRow !== null && editableRow === index  ? 
                                                        <CheckIcon onClick={handleCheck} className='checkButton'/> : 
                                                        uneditable === true ? null : <EditIcon onClick={() => handleEdit(index)} className='editButton'/>
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
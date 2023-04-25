import React, { useState } from 'react'
import '../Styling/TableStyles.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextField from '@material-ui/core/TextField'
import CheckIcon from '@mui/icons-material/Check';

function Table(props) {

    const { columns, rows, refresh, setRefresh } = props

    const [editableRow, setEditableRow] = useState(null);

    const handleEdit = (index) => {
        console.log(editableRow)
        setEditableRow(index);
    }

    const handleInputChange = (event, rowIndex, cellIndex) => {
        // handle input change here, e.g. update state or send to server
      };

    const handleDelete = () => {
        console.log('Delete')
    }

    const handleCheck = () => {
        console.log('check')
        setEditableRow(null);
        alert('Updated successfully.')
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
                                                    editableRow === index ? 
                                                        <TextField value={data} onChange={(event) => handleInputChange(event, index, 1)} 
                                                            size='small' variant="outlined" type='text'/>: 
                                                            data
                                                }                                                
                                                <DeleteIcon onClick={handleDelete} className='deleteButton'/>
                                                {
                                                    editableRow !== null && editableRow === index  ? 
                                                        <CheckIcon onClick={handleCheck} className='checkButton'/> : 
                                                        <EditIcon onClick={() => handleEdit(index)} className='editButton'/>
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
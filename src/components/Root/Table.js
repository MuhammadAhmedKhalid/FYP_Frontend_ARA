import React from 'react'
import '../Styling/TableStyles.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { height } from '@mui/system';

function Table(props) {

    const { columns, rows } = props

    const handleDelete = () => {
        console.log('Delete')
    }

    const handleEdit = () => {
        console.log('Edit')
    }

    const handleRefresh = () => {
        console.log('Refresh')
    }

    return (
        <div className="table-container" style={{ marginTop: '30px' }}>
            <div className='refreshContainer'><RefreshIcon onClick={handleRefresh} className='refreshButton'/></div>
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
                                            {data}
                                            <DeleteIcon onClick={handleDelete} className='deleteButton'/>
                                            <EditIcon onClick={handleEdit} className='editButton'/>
                                        </td>
                                    ))
                                    
                                }
                            </tr>
                          ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
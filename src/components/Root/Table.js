import React from 'react'
import '../Styling/TableStyles.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Table(props) {

    const { columns, rows, uneditable, setDeleteId, setUpdate, setData } = props

    let rowData = []

    for(let i of rows){
        const [first, ...rest] = i;
        rowData.push(rest)
    }

    const handleEdit = (index) => {
        setUpdate(true)
        setData(rows[index])
    }

    const handleDelete = (index) => {
        setDeleteId(rows[index][0])
    }

    const isMobile = window.innerWidth <= 1040;

    return (
        <div>
            <div className="table-container" style={{ marginTop: '7px' }}>
                <table className="table">
                    <thead className="fixed-header">
                        <tr>
                            {
                                columns.map((column, index) => (<th key={index}>{column}</th>))
                            }
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rowData.map((cellData, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    {
                                        cellData.map((data, dataIndex)=>(
                                            <td key={dataIndex}>
                                                {
                                                    data
                                                }  
                                            </td>
                                        ))
                                    }
                                    <td>
                                    {
                                        isMobile ? null :
                                        <>
                                        {
                                            uneditable === true ? null : 
                                            <EditIcon style={{marginRight: '3px'}} 
                                                onClick={() => handleEdit(index)} 
                                                className='editButton'/>
                                        }
                                        <DeleteIcon style={{marginRight: uneditable === true ? '0px' : '3px'}}
                                            onClick={() => handleDelete(index)} 
                                            className='deleteButton'/>
                                        </>
                                    }
                                    </td>
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
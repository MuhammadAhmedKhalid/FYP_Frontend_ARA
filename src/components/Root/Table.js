import React from 'react'
import '../Styling/TableStyles.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Table(props) {

    const { columns, rows } = props

    return (
        <div className="table-container" style={{ marginTop: '30px' }}>
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
                            <tr style={{position: 'relative'}} key={index}>
                                <td>{index+1}</td>
                                {
                                    cellData.map((data, dataIndex)=>(
                                        <td key={dataIndex}>
                                            {/* <p></p> */}
                                            {data}
                                            <EditIcon style={{ position: 'absolute' , top: 14, right: 50}}/>
                                            <DeleteIcon style={{ position: 'absolute' , top: 14, right: 12}}/>
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
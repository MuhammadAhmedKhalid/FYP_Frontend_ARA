import React from 'react'
import '../Styling/TableStyles.css'

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
                            <tr key={index}>
                                <td>{index+1}</td>
                                {
                                    cellData.map((data, dataIndex)=>(
                                        <td key={dataIndex}>{data}</td>
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
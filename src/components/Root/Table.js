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
                        rows.map(({column1, column2}, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{column1}</td>
                                <td>{column2}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
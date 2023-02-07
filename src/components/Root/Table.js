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
                        columns.length < 5 ? rows.map(({column1, column2}, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{column1}</td>
                                <td>{column2}</td>
                            </tr>
                        )) :
                        rows.map(({column1, column2, column3, column4}, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{column1}</td>
                                <td>{column2}</td>
                                <td>{column3}</td>
                                <td>{column4}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
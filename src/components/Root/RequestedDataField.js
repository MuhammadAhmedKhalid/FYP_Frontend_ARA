import React from 'react'
import '../Styling/HomeScreen.css'

function RequestedDataField(props) {

    const{index, name, date, startTime, endTime, details} = props

  return (
    <div key={index} className="col-data" style={{marginTop: '10px'}}>
        <div className='align'>
            <div className="circle">
                R
            </div>
            <div style={{marginLeft: '15px'}}>
                <h5>{name}</h5>
                <h6>{details}</h6>
                <h6>{date} | {startTime} - {endTime}</h6>
            </div>
        </div>
    </div>
  )
}

export default RequestedDataField
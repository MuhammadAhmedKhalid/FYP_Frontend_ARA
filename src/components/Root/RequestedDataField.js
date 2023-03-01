import React from 'react'
import '../Styling/HomeScreen.css'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';

function RequestedDataField(props) {

    const{index, name, date, startTime, endTime, details, from} = props

    const isAdmin = useSelector((state) => state.login.user._admin)

    return (
        <div key={index} className="col-data container" style={{marginTop: '10px'}}>
                <div className='align left-div'>
                    <div className="circle">
                        R
                    </div>
                    <div style={{marginLeft: '15px'}}>
                        <h5>{name}</h5>
                        <h6>{details}</h6>
                        {
                            isAdmin ? <h6>{from}</h6> : null
                        }
                        <h6>{date} | {startTime} - {endTime}</h6>
                    </div>
                </div>
                <div className='align-y right-div'>
                    <DeleteIcon className='delete-btn' />
                </div>
        </div>
    )
}

export default RequestedDataField
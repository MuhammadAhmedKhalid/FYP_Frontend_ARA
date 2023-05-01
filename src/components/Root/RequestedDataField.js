import React from 'react'
import '../Styling/HomeScreen.css'
import DeleteIcon from '@mui/icons-material/Delete';

function RequestedDataField(props) {

    const{index, name, date, startTime, endTime, details, from , setDel, setReq_id, id, setResource, resource_type} = props

    const handleClick = () => {
        const result = window.confirm('Are you sure you want to delete it?');
        if (result === true) {
            alert('Operation performed successfully.')
            setDel(true)
            setReq_id(id)
            setResource(resource_type)
          } else {
            console.log('No')
          }
    }

    const isAdmin = localStorage.getItem('is_admin')

    return (
        <div key={index} className="col-data container" style={{marginTop: '10px'}}>
                <div className='align left-div'>
                    <div className="circle">
                        R
                    </div>
                    {
                        isAdmin && resource_type === "LR" ? 
                        <div style={{marginLeft: '15px'}}>
                            <h5>{name}</h5>
                            <h6>{details}</h6>
                            <h6>{date} | {startTime} - {endTime}</h6>
                        </div> : 
                        !isAdmin && resource_type === "LR" ? 
                        <div style={{marginLeft: '15px'}}>
                            <h5>{date}</h5>
                            <h6>{details}</h6>
                            <h6>{startTime} - {endTime}</h6>
                        </div> : 
                        <div style={{marginLeft: '15px'}}>
                            <h5>{name}</h5>
                            <h6>{details}</h6>
                            {
                                isAdmin ? <h6>{from}</h6> : null
                            }
                            <h6>{date} | {startTime} - {endTime}</h6>
                        </div>
                    }
                </div>
                <div className='align-y right-div'>
                    <DeleteIcon className='delete-btn' onClick={handleClick}/>
                </div>
        </div>
    )
}

export default RequestedDataField
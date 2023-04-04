import React from 'react'
import '../Styling/NavbarStyles.css'
import { BsCheckCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";

function CheckUnCheckIcon() {
  return (
    <div className='inline'>
        <div className="checked-icon-container inline">
            <BsCheckCircle size="1.5em" style={{marginRight: '5px', marginLeft: '5px'}}/>
        </div>
        <div className="unchecked-icon-container inline">
            <BsXCircle size="1.5em"/>
        </div>
    </div>
  )
}

export default CheckUnCheckIcon
import React from 'react'
import FacultyNavbar from './FacultyNavbar'

function FacultyConstraints() {
  return (
    <div className="flexbox-container-y"
        style={{
            display: 'flex',
            justifyContent: 'flex-start',
            height: '100vh',
            background: '#fff'
        }}>
            <div>
                <FacultyNavbar/>
            </div>
    </div>
  )
}

export default FacultyConstraints
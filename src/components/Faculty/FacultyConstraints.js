import React, { useState } from 'react'
import FacultyNavbar from './FacultyNavbar'
import ConstraintsForm from './ConstraintsForm'

function FacultyConstraints() {

    const [showForm, setShowForm] = useState(false)

    return (
        <>
            {
                showForm === false ?
                <div className="flexbox-container-y"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        height: '100vh',
                        background: '#fff'
                    }}>
                    <FacultyNavbar/>
                    <h2 className='center' style={{ color: "#115868", fontSize: 30, marginTop: '5rem', marginBottom: '1.5rem' }}>
                        Constraints
                    </h2>
                
                    <div className='flexbox-container-y centered-container '>
                        <p style={{color: 'hsl(0, 0%, 58%)', marginBottom: '15px'}}>No constraints have been added yet. Add them now.</p>
                        <button className='modal-btn' onClick={() => setShowForm(true)}>
                            Add Constraints
                        </button>
                    </div>
                </div> 
                :
                <ConstraintsForm setShowForm={setShowForm}/>
            }
        </>
    )
}

export default FacultyConstraints
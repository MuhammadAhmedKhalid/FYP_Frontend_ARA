import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import ConstraintsForm from './ConstraintsForm'
import '../Styling/Profile.css'
import '../Styling/AvailabilityTable.css';
import { useSelector, useDispatch } from 'react-redux'
import { getFacultyConstraintsRequest } from '../../redux/GetFacultyConstraints/getFacultyConstraintsActions'

function FacultyConstraints() {

    const dispatch = useDispatch()

    const institute_id = Number(localStorage.getItem('institute_id'))
    const faculty_id = Number(localStorage.getItem('faculty_id'))

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const constraints = useSelector((state) => state.getFacultyConstraintsReducer.facultyConstraints)

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getFacultyConstraintsRequest(faculty_id))
        }
    }, [institute_id])

    const [showForm, setShowForm] = useState(false)

    const shouldSetHeightTo100vh = constraints.length === 0 || constraints.length === 1;

    return (
        <>
            {
                showForm === false ?
                <div className="flexbox-container-y"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        height: shouldSetHeightTo100vh ? '100vh' : 'fit-content',
                        background: '#fff'
                    }}>
                    <FacultyNavbar/>
                    <h2 className='center' style={{ color: "#115868", fontSize: 30, marginTop: '5rem', marginBottom: '1.5rem' }}>
                        Constraints
                    </h2>
                    {
                        constraints.length === 0 ?
                        <div className='flexbox-container-y centered-container '>
                            <p style={{color: 'hsl(0, 0%, 58%)', marginBottom: '15px'}}>No constraints have been added yet. Add them now.</p>
                            <button className='modal-btn' onClick={() => setShowForm(true)}>
                                Add Constraints
                            </button>
                        </div>
                        :
                        <>
                            <button style={{right: 30, top: 120,position: 'absolute'}} className='modal-btn' onClick={() => setShowForm(true)}>
                                Add Constraints
                            </button>
                            {constraints.map((data, index) => (
                            <div className="profile" key={index}>
                                <h2 className="profile__title">Constraint-{index + 1}</h2>
                                <div className="profile__details">
                                    <div className="profile__detail">
                                        <span className="profile__label" style={{ width: '11rem' }}>Applicable Start date:</span>
                                        <span className="profile__value">{data.applicableStartDate || '-'}</span>
                                    </div>
                                </div>
                                <div className="profile__details">
                                    <div className="profile__detail">
                                        <span className="profile__label" style={{ width: '11rem' }}>Applicable End date:</span>
                                        <span className="profile__value">{data.applicableEndDate || '-'}</span>
                                    </div>
                                </div>
                                <table className="availability-table">
                                    <thead>
                                        <tr>
                                            <th>Days</th>
                                            <th>Availability Start time</th>
                                            <th>Availability End time</th>
                                            <th>Break-01 Start time</th>
                                            <th>Break-01 End time</th>
                                            <th>Break-02 Start time</th>
                                            <th>Break-02 End time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {daysOfWeek.map((day) => (
                                        <tr key={day}>
                                            <td>{day}</td>
                                            <td>{data.availability?.[day.toLowerCase()]?.startTime || '-'}</td>
                                            <td>{data.availability?.[day.toLowerCase()]?.endTime || '-'}</td>
                                            <td>{data.breaks?.[day.toLowerCase()]?.break1?.startTime || '-'}</td>
                                            <td>{data.breaks?.[day.toLowerCase()]?.break1?.endTime || '-'}</td>
                                            <td>{data.breaks?.[day.toLowerCase()]?.break2?.startTime || '-'}</td>
                                            <td>{data.breaks?.[day.toLowerCase()]?.break2?.endTime || '-'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                        </>
                    }
                </div> 
                :
                <ConstraintsForm setShowForm={setShowForm}/>
            }
        </>
    )
}

export default FacultyConstraints
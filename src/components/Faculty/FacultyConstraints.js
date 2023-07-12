import React, { useState } from 'react'
import FacultyNavbar from './FacultyNavbar'
import ConstraintsForm from './ConstraintsForm'
import '../Styling/Profile.css'
import '../Styling/AvailabilityTable.css';

function FacultyConstraints() {

    const [showForm, setShowForm] = useState(false)

    const constraints = [
        {
            day: 'Monday',
            availabilityStartTime: '9:00 AM',
            availabilityEndTime: '5:00 PM',
            break01StartTime: '12:00 PM',
            break01EndTime: '1:00 PM',
            break02StartTime: '3:00 PM',
            break02EndTime: '3:30 PM',
        },
        {
            day: 'Tuesday',
            availabilityStartTime: '9:00 AM',
            availabilityEndTime: '5:00 PM',
            break01StartTime: '12:00 PM',
            break01EndTime: '1:00 PM',
            break02StartTime: '3:00 PM',
            break02EndTime: '3:30 PM',
        },
        {
            day: 'Wednesday',
            availabilityStartTime: '9:00 AM',
            availabilityEndTime: '5:00 PM',
            break01StartTime: '12:00 PM',
            break01EndTime: '1:00 PM',
            break02StartTime: '3:00 PM',
            break02EndTime: '3:30 PM',
        },{
            day: 'Thursday',
            availabilityStartTime: '9:00 AM',
            availabilityEndTime: '5:00 PM',
            break01StartTime: '12:00 PM',
            break01EndTime: '1:00 PM',
            break02StartTime: '3:00 PM',
            break02EndTime: '3:30 PM',
        },{
            day: 'Friday',
            availabilityStartTime: '9:00 AM',
            availabilityEndTime: '5:00 PM',
            break01StartTime: '12:00 PM',
            break01EndTime: '1:00 PM',
            break02StartTime: '3:00 PM',
            break02EndTime: '3:30 PM',
        },{
            day: 'Saturday',
            availabilityStartTime: '9:00 AM',
            availabilityEndTime: '5:00 PM',
            break01StartTime: '12:00 PM',
            break01EndTime: '1:00 PM',
            break02StartTime: '3:00 PM',
            break02EndTime: '3:30 PM',
        },
    ];

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
                            <div className="profile">
                                <h2 className="profile__title">Constraint-01</h2>
                                <div className="profile__details">
                                    <div className="profile__detail">
                                        <span className="profile__label" style={{width: '11rem'}}>Applicable Start date:</span>
                                        <span className="profile__value">13-Jul-23</span>
                                    </div>
                                </div>
                                <div className="profile__details">
                                    <div className="profile__detail">
                                        <span className="profile__label" style={{width: '11rem'}}>Applicable End date:</span>
                                        <span className="profile__value">21-Jul-23</span>
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
                                        {constraints.map((row) => (
                                        <tr key={row.day}>
                                            <td>{row.day}</td>
                                            <td>{row.availabilityStartTime}</td>
                                            <td>{row.availabilityEndTime}</td>
                                            <td>{row.break01StartTime}</td>
                                            <td>{row.break01EndTime}</td>
                                            <td>{row.break02StartTime}</td>
                                            <td>{row.break02EndTime}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="profile">
                                <h2 className="profile__title">Constraint-01</h2>
                                <div className="profile__details">
                                    <div className="profile__detail">
                                        <span className="profile__label" style={{width: '11rem'}}>Applicable Start date:</span>
                                        <span className="profile__value">13-Jul-23</span>
                                    </div>
                                </div>
                                <div className="profile__details">
                                    <div className="profile__detail">
                                        <span className="profile__label" style={{width: '11rem'}}>Applicable End date:</span>
                                        <span className="profile__value">21-Jul-23</span>
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
                                        {constraints.map((row) => (
                                        <tr key={row.day}>
                                            <td>{row.day}</td>
                                            <td>{row.availabilityStartTime}</td>
                                            <td>{row.availabilityEndTime}</td>
                                            <td>{row.break01StartTime}</td>
                                            <td>{row.break01EndTime}</td>
                                            <td>{row.break02StartTime}</td>
                                            <td>{row.break02EndTime}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
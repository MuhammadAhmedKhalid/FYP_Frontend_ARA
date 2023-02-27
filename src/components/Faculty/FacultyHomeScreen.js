import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import FullCalendar from '../Root/FullCalendar'
import '../Styling/HomeScreen.css'
import { useSelector } from 'react-redux'

function FacultyHomeScreen() {

    const [greetings, setGreetings] = useState("")
    const facultyName = useSelector((state) => state.login.user.name)

    useEffect(() => {
        let date = new Date();
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).split(":")
        const setMessage = () => {
            if (time[0] >= 5 && time[0] <= 11) {
                setGreetings("Morning")
            } else if (time[0] >= 12 && time[0] <= 16) {
                setGreetings("Afternoon")
            } else if (time[0] >= 17 && time[0] <= 20) {
                setGreetings("Evening")
            } else {
                setGreetings("Night")
            }
        }
        setMessage()
    }, [])

    return (
        <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <div>
                <FacultyNavbar />
                <div style={{ marginTop: '60px', padding: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: 'normal' }}>Good {greetings}</h2>
                    </div><h1 style={{ color: '#0E5E6F' }}>{facultyName}!</h1>
                </div>
                <div className='flexbox-container' style={{ justifyContent: 'space-between' }}>
                    <div className="gradient" style={{
                        width: 450,
                        height: 235,
                        backgroundColor: '#0E5E6F',
                        borderRadius: 15,
                        margin: '15px'
                    }}>
                        <div style={{ margin: '25px' }}>
                            <h2 style={{ fontWeight: 'normal' }}>Total Assigned Courses: <b>7</b></h2><br />
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Cloud Computing</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Software Project Management</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Human Computer Interaction</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>E-Commerce</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Marketing</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Programming Fundamentals</h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Introduction to Software Engineering</h3>
                        </div>
                    </div>
                    <div style={{ justifyContent: 'flex-end' }}>
                        <FullCalendar
                            messages={{ next: '>', previous: '<', today: 'Current' }}
                            views={['week', 'day']}
                            style={{ height: 280, width: 700, padding: '15px' }}
                            defaultView="week"
                        />
                    </div>
                </div>
                <div style={{ marginTop: '25px', marginLeft: '25px' }}>
                    <h3 style={{ fontWeight: 'revert', color: 'black' }}>Request Applied For: </h3>
                </div>
                <div style={{
                        width: '98%',
                        height: 238,
                        borderRadius: 15,
                        margin: '15px',
                        border: '2px solid black'
                    }}>
                        <div className="grid-container">
                            <div className="col">
                                <p>Leave Request</p>
                                <div className="col-data" style={{marginTop: '10px'}}>
                                    <div className='align'>
                                        <div className="circle">
                                            R
                                        </div>
                                        <div style={{marginLeft: '15px'}}>
                                            <h5>Projector</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <p>Object Request</p>
                            </div>
                            <div className="col">
                                <p>Room Request</p>
                            </div>
                            <div className="col">
                                <p>Staff Request</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyHomeScreen
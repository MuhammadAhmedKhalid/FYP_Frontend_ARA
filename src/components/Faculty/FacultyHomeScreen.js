import React, { useState, useEffect } from 'react'
import FacultyNavbar from './FacultyNavbar'
import FullCalendar from '../Root/FullCalendar'
import '../Styling/HomeScreen.css'
import Img11 from '../../assets/img11.png'

function FacultyHomeScreen() {

    const [greetings, setGreetings] = useState("")

    useEffect(() => {
        let date = new Date();
        let timeDetails = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' }).split(" ")
        const setMessage = () => {
            let hour = parseInt(timeDetails[0].substring(0, 2))
            switch (timeDetails[1]) {
                case "AM":
                    if (hour >= 0 && hour <= 4) {
                        setGreetings("Night")
                    } else {
                        setGreetings("Morning")
                    }
                    break
                case "PM":
                    if (hour >= 0 && hour <= 4) {
                        setGreetings("Afternoon")
                    } else if (hour >= 5 && hour <= 8) {
                        setGreetings("Evening")
                    } else {
                        setGreetings("Night")
                    }
                    break
                default:
                    break
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
                        <h2 style={{ fontWeight: 'normal' }}>Good </h2>
                        <div className='flexbox-container'>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    marginRight: '5px'
                                }}>
                                <img src={Img11} alt='Faculty' />
                            </div>
                            {
                                <h2 style={{ color: '#0E5E6F' }}>Muhammad</h2>
                            }
                        </div>
                    </div><h1 style={{ color: '#0E5E6F' }}>Muhammad Ahmed!</h1>
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
                            style={{ height: 350, width: 700, padding: '15px' }}
                            defaultView="week"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyHomeScreen
import React, { useEffect, useState } from 'react'
import FullCalendar from '../Root/FullCalendar'
import AdminNavBar from './AdminNavbar'
import Img10 from '../../assets/img10.png'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

function AdminHomeScreen() {

    const [greetings, setGreetings] = useState("")
    const location = useLocation();
    const adminName = useSelector((state) => state.login.user.admin_name)
    const state = location.state
    const [instituteName, setInstituteName] = useState("")

    useEffect(() => {
        setInstituteName(state.institute_name)
    }, [state])

    useEffect(() => {
        let date = new Date();
        let timeDetails = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).split(" ")
        const setMessage = () => {
            let hour = parseInt(timeDetails[0][0])
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
                <AdminNavBar />
                <div style={{ marginTop: '60px', padding: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: 'normal' }}>Good {greetings}</h2>
                        <div className='flexbox-container'>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '30.4px',
                                    height: '30.4px',
                                    borderRadius: '50%',
                                    marginRight: '5px'
                                }}>
                                <img src={Img10} alt='Admin' />
                            </div>
                            {
                                <h2 style={{ color: '#0E5E6F' }}>{adminName}</h2>
                            }
                        </div>
                    </div><h1 style={{ color: '#0E5E6F' }}>{instituteName}!</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <FullCalendar
                        messages={{ next: '>', previous: '<', today: 'Current' }}
                        views={['month']}
                        style={{ height: 350, width: 450, padding: '15px' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminHomeScreen
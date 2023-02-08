import React, { useEffect, useState } from 'react'
import FullCalendar from '../Root/FullCalendar'
import AdminNavBar from './AdminNavbar'
import Img10 from '../../assets/img10.png'
import '../Styling/HomeScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import { getFacultyRequest } from '../../redux/GetFaculty/getFacultyActions'

function AdminHomeScreen() {

    const dispatch = useDispatch()

    const faculty = useSelector((state) => state.getFaculty.faculty)
    const [instituteId, setInstituteId] = useState(0)
    const [greetings, setGreetings] = useState("")
    const adminName = useSelector((state) => state.login.user.name)
    const instituteName = useSelector((state) => state.login.user.institute_name)
    const institute_name = useSelector((state) => state.institute.institute.institute_name)
    const institutes = useSelector((state) => state.getInstitutes.institutes.data)
    const isInstitutesAdded = useSelector((state) => state.getInstitutes.added)
    const admin_id = useSelector((state) => state.login.user.user_id)

    useEffect(() => {
        if (isInstitutesAdded && institutes.length !== 0) {
            for (let i = 0; i < institutes.length; i++) {
                if (institutes[i].user_id === admin_id) {
                    setInstituteId(institutes[i].institute_id)
                }
            }
        }
    }, [isInstitutesAdded])

    useEffect(() => {
        dispatch(getFacultyRequest(instituteId))
    }, [instituteId])

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
                    </div><h1 style={{ color: '#0E5E6F' }}>{instituteName || institute_name}!</h1>
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
                            <h2 style={{ fontWeight: 'normal' }}>Total Faculty Members: <b>{faculty.length}</b></h2><br />
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Software Engineering: <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Civil Engineering: <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Urban and Infrastructure Engineering: <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Petroleum Engineering: <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Mechanical Engineering: <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Textile Engineering <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Electrical Engineering: <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Telecommunication Engineering: <b>0</b></h3>
                            <h3 style={{ fontWeight: 'normal', color: 'black' }}>Chemical Engineering: <b>0</b></h3>
                        </div>
                    </div>
                    <div style={{ justifyContent: 'flex-end' }}>
                        <FullCalendar
                            messages={{ next: '>', previous: '<', today: 'Current' }}
                            views={['month']}
                            style={{ height: 350, width: 450, padding: '15px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHomeScreen
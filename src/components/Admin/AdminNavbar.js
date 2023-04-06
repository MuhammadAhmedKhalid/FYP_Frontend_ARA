import React, { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';
import "../Styling/NavbarStyles.css"
import CustomDropdown from '../Root/CustomDropdown';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logoutRequest } from '../.././redux/Login/loginActions'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckUnCheckIcon from '../Root/CheckUnCheckIcon';
 
const logo = {
    fontSize: '20px',
    fontFamily: 'Segoe UI'
}

const AdminNavBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

    const handleLogout = () => {
        dispatch(logoutRequest)
    }

    const [click, setClick] = useState(false)
    const [color, setColor] = useState(false)
    const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
    const [notificationNum, setNotificationNum] = useState(0)

    const handleClick = () => setClick(!click)
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }

    window.addEventListener("scroll", changeColor);

    function handleNotificationIconClick() {
        setIsNotificationPanelOpen(!isNotificationPanelOpen);
    }
    
    function handleNotificationPanelClose() {
        setIsNotificationPanelOpen(false);
    }

    return (
        <div>
            <div className={color ? 'header header-bg' : 'header'}>
                <Link to='/admin'>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul style={{ listStyle: 'none' }} className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li><NavLink to='/admin'>Home</NavLink></li>
                    <li><NavLink to='/instituteSchedule'>Schedule</NavLink></li>
                    <CustomDropdown items={[{
                        name: 'Departments',
                        value: 'departments',
                        path: '/departments'
                    },
                    {
                        name: 'Batches',
                        value: 'batches',
                        path: '/batches'
                    },
                    {
                        name: 'Rooms',
                        value: 'rooms',
                        path: '/rooms'
                    },
                    {
                        name: 'Objects',
                        value: 'objects',
                        path: '/objects'
                    },
                    {
                        name: 'Positions',
                        value: 'positions',
                        path: '/positions'
                    },
                    {
                        name: 'Courses',
                        value: 'courses',
                        path: '/courses'
                    },
                    {
                        name: 'Faculty',
                        value: 'faculty',
                        path: '/faculty'
                    },
                    {
                        name: 'Assigned courses',
                        value: 'assigned courses',
                        path: '/assignedCourses'
                    }]} />
                    <li>
                        <NavLink onClick={handleNotificationIconClick}>
                            <Badge badgeContent={notificationNum} color="info">
                                <NotificationsIcon style={{color: '#fff', height: '20px'}} />
                            </Badge>
                        </NavLink>
                    </li>
                    <li> <NavLink onClick={handleLogout}>Logout</NavLink></li>
                </ul >
                {isNotificationPanelOpen && (
                    <div className="notification-panel" onMouseLeave={handleNotificationPanelClose}>
                        <h2>NOTIFICATIONS</h2>
                        {
                            notificationNum !== 0 ? 
                            <ul>
                            <li>
                                <h3 style={{fontWeight: 'bold', fontSize: '15px'}}>Kinza's Replacement for ISE (2019-SE).</h3>
                                <h3>Date: 04/Apr/2023</h3>
                                <div>
                                    <p className="space-line"></p> 
                                    <p style={{display: 'block'}}>Muhammad Ahmed 
                                        <p style={{fontWeight: 'lighter'}}> (Weightage: 0.3 out of 1)</p>
                                        <CheckUnCheckIcon/>
                                    </p>
                                    <p style={{display: 'block'}}>Khalid Hussain 
                                        <p style={{fontWeight: 'lighter'}}> (Weightage: 0.7 out of 1)</p>
                                        <CheckUnCheckIcon/>
                                    </p>
                                    <p style={{display: 'block'}}>Manal Ali 
                                        <p style={{fontWeight: 'lighter'}}> (Weightage: 0.2 out of 1)</p>
                                        <CheckUnCheckIcon/>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h3 style={{fontWeight: 'bold', fontSize: '15px'}}>Kinza's Replacement for PP (2019-SE).</h3>
                                <h3>Date: 04/Apr/2023</h3>
                                <div>
                                    <p className="space-line"></p>
                                    <p style={{display: 'block'}}> 
                                        <p style={{fontWeight: 'lighter'}}>Replaced by: </p>
                                        Khalid Hussain (SE)
                                        <p style={{fontWeight: 'lighter'}}> (Weightage: 0.3 out of 1)</p>
                                    </p>
                                </div>
                            </li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                        </ul> : <h4 style={{color: 'gray', fontWeight: 'normal', marginTop: '15px'}}>No notifications found.</h4>
                        }
                    </div>
                )}
                <div className="hamburger" onClick={handleClick}>
                    {
                        click ? <FaTimes size={20} style={{ color: '#fff' }} /> :
                            <FaBars size={20} style={{ color: '#fff' }} />
                    }
                </div>
            </div >
        </div >
    )
}

export default AdminNavBar
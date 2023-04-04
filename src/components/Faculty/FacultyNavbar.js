import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '../.././redux/Login/loginActions'
import CustomDropdown from '../Root/CustomDropdown';
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';
import "../Styling/NavbarStyles.css"
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
                <Link to='/faculty-home'>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul style={{ listStyle: 'none' }} className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li><NavLink to='/faculty-home'>Home</NavLink></li>
                    <CustomDropdown items={[{
                        name: 'Add Leave',
                        value: 'add leave',
                        onClick: true
                    },
                    {
                        name: 'Object Request',
                        value: 'object request',
                        onClick: true
                    },
                    {
                        name: 'Request Room',
                        value: 'request room',
                        onClick: true
                    },
                    {
                        name: 'Staff Request',
                        value: 'staff request',
                        onClick: true
                    }]} />
                    <li> <NavLink to='/schedule'>My Schedule</NavLink></li>
                    <li>
                        <NavLink onClick={handleNotificationIconClick}>
                            <Badge badgeContent={3} color="info">
                                <NotificationsIcon style={{color: '#fff', height: '20px'}} />
                            </Badge>
                        </NavLink>
                    </li>
                    <li> <NavLink onClick={handleLogout}>Logout</NavLink></li>
                </ul >
                {isNotificationPanelOpen && (
                    <div className="notification-panel" onMouseLeave={handleNotificationPanelClose}>
                        <h2>Notifications</h2>
                        <ul>
                            <li>Notification.</li>
                            <li>Notification.</li>
                            <li>Notification.</li>
                        </ul>
                    </div>
                )}
                <div className="hamburger" onClick={handleClick}>
                    {
                        click ? <FaTimes size={20} style={{ color: '#fff' }} /> :
                            <FaBars size={20} style={{ color: '#fff' }} />
                    }
                </div>
            </div >
        </div>
    )

}

export default AdminNavBar
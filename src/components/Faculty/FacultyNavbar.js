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
import { getNotificationsRequest } from '../../redux/GetNotifications/getNotificationsActions'

const logo = {
    fontSize: '20px',
    fontFamily: 'Segoe UI'
}

const AdminNavBar = () => {

    const [click, setClick] = useState(false)
    const [color, setColor] = useState(false)
    const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
    const [notificationNum, setNotificationNum] = useState(0)

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
    const institute_id = localStorage.getItem('institute_id')
    const notifications = useSelector((state) => state.notificationsReqReducer.notifications.data)
    const notificationsAdded = useSelector((state) => state.notificationsReqReducer.added)
    const user_id = localStorage.getItem('user_id')
    const [notificationsList, setNotificationsList] = useState([])

    useEffect(() => {
        setNotificationNum(0)
        if(notificationsAdded){
            // setNotificationNum(0)
            for(let i of notifications){
                if(i.user_id === user_id){
                    notificationsList.push(i)
                }
            }
            setNotificationNum(notificationsList.length)
        }
    }, [notificationsAdded])

    useEffect(() => {
        if(institute_id > 0){
            dispatch(getNotificationsRequest(institute_id))
        }
    }, [institute_id])

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

    const handleLogout = () => {
        dispatch(logoutRequest)
    }

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
                            <Badge badgeContent={notificationNum} color="info">
                                <NotificationsIcon style={{color: '#fff', height: '20px'}} />
                            </Badge>
                        </NavLink>
                    </li>
                    <li> <NavLink onClick={handleLogout}>Logout</NavLink></li>
                </ul >
                {isNotificationPanelOpen && (
                    <div className="notification-panel" onMouseLeave={handleNotificationPanelClose}>
                        <h2>Notifications</h2>
                        {
                            notificationNum !== 0 ? 
                            <ul>
                                {
                                    notifications.slice(0).reverse().map((notification, index) =>
                                        notification.user_id === user_id ?
                                        <li key={index}>
                                            <h3 style={{fontWeight: 'normal', fontSize: '15px'}}>{notification.title}</h3>
                                            <h3>Date: {notification.date}</h3>
                                            {
                                                notification.details.length > 0 ? 
                                                <div>
                                                    <p className="space-line"></p>
                                                    <p style={{display: 'block'}}> 
                                                        <p style={{fontWeight: 'lighter'}}>Replaced by: </p>
                                                        {notification.details}
                                                    </p>
                                                </div> : null
                                            }
                                        </li> : null
                                    )
                                }
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
        </div>
    )

}

export default AdminNavBar
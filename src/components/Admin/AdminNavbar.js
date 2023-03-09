import React, { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';
import "../Styling/NavbarStyles.css"
import CustomDropdown from '../Root/CustomDropdown';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logoutRequest } from '../.././redux/Login/loginActions'

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

    const handleClick = () => setClick(!click)
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }
    window.addEventListener("scroll", changeColor);
    return (
        <div>
            <div className={color ? 'header header-bg' : 'header'}>
                <Link to='/admin'>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul style={{ listStyle: 'none' }} className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li><NavLink to='/admin'>Home</NavLink></li>
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
                        name: 'Position',
                        value: 'position',
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
                    <li> <NavLink onClick={handleLogout}>Logout</NavLink></li>
                </ul >
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
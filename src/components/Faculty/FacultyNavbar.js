import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '../.././redux/Login/loginActions'
import CustomDropdown from '../Root/CustomDropdown';
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';
import "../Styling/NavbarStyles.css"
import { useNavigate } from "react-router-dom";

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

    // const [openLeaveModal, setLeaveModal] = useState(false)
    // const openModal1 = () => {
    //     setLeaveModal(true)
    //     console.log(openLeaveModal)
    // }

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
                        onClick: false
                        // onClick: { openModal1 }
                        // path: '/departments'
                    },
                    {
                        name: 'Object Request',
                        value: 'object request',
                        onClick: false
                        // path: '/batches'
                    },
                    {
                        name: 'Request Room',
                        value: 'request room',
                        onClick: false
                        // path: '/rooms'
                    }]} />
                    <li> <NavLink to='/update-profile'>Update Profile</NavLink></li>
                    <li> <NavLink onClick={handleLogout}>Logout</NavLink></li>

                </ul >
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
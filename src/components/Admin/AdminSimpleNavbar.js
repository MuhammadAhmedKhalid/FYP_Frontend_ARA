import React, { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';
import "../Styling/NavbarStyles.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logoutRequest } from '../.././redux/Login/loginActions'

const logo = {
    fontSize: '20px',
    fontFamily: 'Segoe UI'
}

const AdminSimpleNavbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'lighter'
        }
    }

    window.addEventListener("scroll", changeColor);
    const handleLogout = () => {
        dispatch(logoutRequest)
    }
    return (
        <div>
            <div className={color ? 'header header-bg' : 'header'}>
                <Link>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul style={{ listStyle: 'none' }} className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li><NavLink style={navLinkStyles} onClick={handleLogout}>Logout</NavLink></li>
                </ul>
                <div className="hamburger" onClick={handleClick}>
                    {
                        click ? <FaTimes size={20} style={{ color: '#fff' }} /> :
                            <FaBars size={20} style={{ color: '#fff' }} />
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminSimpleNavbar
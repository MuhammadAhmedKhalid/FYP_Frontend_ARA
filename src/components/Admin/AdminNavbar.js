import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';
import "../Styling/NavbarStyles.css"
import CustomDropdown from './CustomDropdown';

const logo = {
    fontSize: '20px',
    fontFamily: 'Segoe UI'
}

const AdminNavBar = () => {

    const [click, setClick] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [color, setColor] = useState(false)

    const handleClick = () => setClick(!click)
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }
    const handleHoverEnter = () => { setShowDropdown(true) }
    const handMouseLeave = () => { setShowDropdown(false) }
    const handleOption = (e) => {
        console.log(e)
    }
    window.addEventListener("scroll", changeColor);
    return (
        <div>
            <div className={color ? 'header header-bg' : 'header'}>
                <Link to='/admin-home'>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul style={{ listStyle: 'none' }} className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li><NavLink to='/admin-home'>Home</NavLink></li>
                    <CustomDropdown />
                    <li> <NavLink to='/'>Logout</NavLink></li>
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
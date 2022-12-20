import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa';

const logo = {
    fontSize: '25px',
    fontFamily: 'Segoe UI'
}

const AdminSimpleNavbar = () => {
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

    return (
        <div>
            <div className={color ? 'header header-bg' : 'header'}>
                <Link>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul style={{ listStyle: 'none' }} className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li><NavLink style={navLinkStyles} to='/'>Logout</NavLink></li>
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
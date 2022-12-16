import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./NavbarStyles.css"
import { FaBars, FaTimes } from 'react-icons/fa';

const logo = {
    fontSize: '25px',
    fontFamily: 'Segoe UI'
}

const NavBar = () => {

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

    window.addEventListener("scroll", changeColor);

    return (
        <div className={color ? 'header header-bg' : 'header'}>
            <Link to={"/"}>
                <h1 style={logo}>ALLOCATOR.</h1>
            </Link>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <Link>Sign In</Link>
            </ul>
            <div className="hamburger" onClick={handleClick}>
                {
                    click ? <FaTimes size={20} style={{ color: '#fff' }} /> :
                        <FaBars size={20} style={{ color: '#fff' }} />
                }
            </div>
        </div>
    )
}

export default NavBar
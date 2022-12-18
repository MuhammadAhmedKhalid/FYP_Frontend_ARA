import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./NavbarStyles.css"
import { FaBars, FaTimes } from 'react-icons/fa';
import Signin from './Signin';

const logo = {
    fontSize: '25px',
    fontFamily: 'Segoe UI'
}

const NavBar = () => {

    const [openSignInModal, setOpenSignInModal] = useState(false)
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

    const openModal = () => {
        setOpenSignInModal(true)
    }

    window.addEventListener("scroll", changeColor);

    return (
        <div>
            <div className={color ? 'header header-bg' : 'header'}>
                <Link to={"/"}>
                    <h1 style={logo}>ALLOCATOR.</h1>
                </Link>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <Link onClick={openModal}>Sign In</Link>
                </ul>
                <div className="hamburger" onClick={handleClick}>
                    {
                        click ? <FaTimes size={20} style={{ color: '#fff' }} /> :
                            <FaBars size={20} style={{ color: '#fff' }} />
                    }
                </div>
            </div>
            <div>
                <Signin setOpenSignInModal={setOpenSignInModal} openSignInModal={openSignInModal} />
            </div>
        </div>
    )
}

export default NavBar
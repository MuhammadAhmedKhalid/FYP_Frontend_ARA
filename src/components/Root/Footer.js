import React from 'react';
import '../Styling/FooterStyles.css';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';


const Footer = () => {

    const isMobile = window.innerWidth <= 1040;

    return (
        <div className='footer'>
            <div className='footer-container' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div className='flexbox-container-y'>
                    <h3>Servives</h3><br />
                    <p>Categories</p><br />
                    <p>Blogs</p><br />
                    <p>Pricing</p><br />
                </div>

                <div className='flexbox-container-y'>
                    <h3>Resources</h3><br />
                    <p>Features</p><br />
                    <p>Apps</p><br />
                    <p>Integration</p><br />
                </div>
                <div className='flexbox-container-y'>
                    <h3>Contact</h3><br />
                    <p>+975-8260-18773</p><br />
                    <p>info@Allocator.com</p><br />
                    <p>ABC Street, Karachi.</p><br />
                </div>
                <div className='flexbox-container-y'>
                    <h3>Socials</h3><br />
                    <div className='flexbox-container'>
                        <FaFacebook size={isMobile ? 12 : null} style={{ color: '#fff' }} />
                        <p>&nbsp;Facebook</p>
                    </div><br />
                    <div className='flexbox-container'>
                        <FaTwitter size={isMobile ? 12 : null} style={{ color: '#fff', marginLeft: '-15px' }} />
                        <p>&nbsp;Twitter</p>
                    </div><br />
                    <div className='flexbox-container'>
                        <FaLinkedin size={isMobile ? 12 : null} style={{ color: '#fff', marginLeft: '-10px' }} />
                        <p>&nbsp;LinkedIn</p>
                    </div><br />
                </div>
            </div>
        </div >
    )
}

export default Footer
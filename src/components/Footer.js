import React from 'react';
import './FooterStyles.css';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='left'>
                    <h1 style={{ fontSize: '16px', fontFamily: 'Segoe UI' }}>ALLOCATOR.</h1>
                    <div className='socials'>
                        <h4>Socials</h4>
                        <FaFacebook size={20} style={{ color: '#fff', marginRight: '2rem' }} />
                        <FaTwitter size={20} style={{ color: '#fff', marginRight: '2rem' }} />
                        <FaLinkedin size={20} style={{ color: '#fff', marginRight: '2rem' }} />
                    </div>
                </div>
                <div className='flexbox-container'>
                    <div className='right'>
                        <div className='flexbox-container-y'>
                            <h3>Servives</h3><br />
                            <p>Categories</p><br />
                            <p>Blogs</p><br />
                            <p>Pricing</p><br />
                        </div>
                    </div>
                    <div className='right'>
                        <div className='flexbox-container-y'>
                            <h3>Resources</h3><br />
                            <p>Features</p><br />
                            <p>Apps</p><br />
                            <p>Integration</p><br />
                        </div>
                    </div>
                    <div className='right'>
                        <div className='flexbox-container-y'>
                            <h3>Contact</h3><br />
                            <p>+975-8260-18773</p><br />
                            <p>info@Allocator.com</p><br />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className='footer'
                style={{
                    marginBottom: -100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <p>© 2022 Copyright&nbsp;</p>
                <p>&nbsp;|&nbsp;</p>
                <p>&nbsp;All Rights Reserved&nbsp;</p>
                <p>&nbsp;|&nbsp;</p>
                <p>&nbsp;Terms of Use&nbsp;</p>
                <p>&nbsp;|&nbsp;</p>
                <p>&nbsp;Privacy Policy</p>
            </div>
        </div>
    )
}

export default Footer
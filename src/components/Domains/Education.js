import React from 'react'
import Img6a from './../../assets/img6a.png'
import Img6b from './../../assets/img6b.png'
import '../Styling/Domains.css'

function Education(props) {

    const isMobile = window.innerWidth <= 1040;

    const { edu_ref } = props

    return (
        <div
            ref={edu_ref}
            className="flexbox-container-y"
            style={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '110vh'
            }}
        >
            <h1 style={{ color: 'black' }} className="heading2">Services</h1>
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F' }} className="heading1">1. Education</h2>
                    <br />
                    <p className='para'>Automated replacement of teachers and staff: With Auto Resource</p>
                    <p className='para'>Allocator, schools can easily find substitute teachers and</p>
                    <p className='para'>staff in real-time to ensure that classes continue to run</p>
                    <p className='para'>smoothly, without interruption.</p>
                    <br />
                    <p className='para'>Scheduling and time management: Auto Resource Allocator</p>
                    <p className='para'>offers powerful scheduling tools that allow</p>
                    <p className='para'> administrators to manage staff schedules and</p>
                    <p className='para'>make changes easily, from one central location.</p>
                </div>
                {
                    isMobile ? null : <><img src={Img6a} style={{ height: 350, width: 200, marginLeft: 25 }} alt='Education_a-img' />
                    <img src={Img6b} style={{ height: 350, width: 200, marginTop: 250 }} alt='Education_b-img' /></>
                }
            </div>
        </div>
    )
}

export default Education
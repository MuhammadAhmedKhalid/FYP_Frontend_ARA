import React from 'react'
import Img6a from './../../assets/img6a.png'
import Img6b from './../../assets/img6b.png'

const pStyle = {
    color: 'black',
    fontSize: 20
}

function Education(props) {

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
            <h1 style={{ color: 'black' }}>Services</h1>
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F', fontSize: 22 }}>1. Education</h2>
                    <br />
                    <p style={pStyle}>Automated replacement of teachers and staff: With Auto Resource</p>
                    <p style={pStyle}>Allocator, schools can easily find substitute teachers and</p>
                    <p style={pStyle}>staff in real-time to ensure that classes continue to run</p>
                    <p style={pStyle}>smoothly, without interruption.</p>
                    <br />
                    <p style={pStyle}>Scheduling and time management: Auto Resource Allocator</p>
                    <p style={pStyle}>offers powerful scheduling tools that allow</p>
                    <p style={pStyle}> administrators to manage staff schedules and</p>
                    <p style={pStyle}>make changes easily, from one central location.</p>
                </div>
                <img src={Img6a} style={{ height: 350, width: 200, marginLeft: 25 }} alt='Education_a-img' />
                <img src={Img6b} style={{ height: 350, width: 200, marginTop: 250 }} alt='Education_b-img' />
            </div>
        </div>
    )
}

export default Education
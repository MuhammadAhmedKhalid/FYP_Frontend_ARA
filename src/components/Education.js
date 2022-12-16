import React from 'react'
import Img6 from '../assets/img6.png'

const pStyle = {
    color: 'black',
    fontSize: 20
}

function Education() {
    return (
        <div
            className="flexbox-container-y"
            style={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <h1 style={{ color: 'black' }}>Services</h1>
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F', fontSize: 25 }}>1. Education</h2>
                    <br />
                    <p style={pStyle}>Lorem ipsum dolor sit amet.</p>
                    <p style={pStyle}>Ut doloribus enim et nostrud ui quia velit est repellat rerum sit.</p>
                    <p style={pStyle}>Lorem ipsum dolor sit amet.</p>
                    <p style={pStyle}>Ut doloribus enim et nostrud ui quia loribus enim et nostrud ui quia velit est repellat rerum sit.</p>
                    <p style={pStyle}>Lorem ipsum dolor sit amet.</p>
                    <p style={pStyle}>Ut doloribus enim et nostrud ui quia velit est repellat rerum sit.</p>
                    <p style={pStyle}>Lorem ipsum dolor sit amet.</p>
                    <p style={pStyle}>Ut doloribus enim et nostrud ui quia velit est repellat rerum</p>
                </div>
                <img src={Img6} alt='Education-img' />
            </div>
        </div>
    )
}

export default Education
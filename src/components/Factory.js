import React from 'react'
import Img7 from '../assets/img7.png'

const pStyle = {
    color: 'black',
    fontSize: 20
}

function Factory() {
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
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F', fontSize: 25 }}>2. Factory</h2>
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
                <img src={Img7} alt='Factory-img' />
            </div>
        </div>
    )
}

export default Factory
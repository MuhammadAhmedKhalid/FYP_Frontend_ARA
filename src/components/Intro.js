import React from 'react'
import Img1 from '../assets/img1.png'

const heading = {
    fontSize: '80px'
}

function Intro() {
    return (
        <div
            className="flexbox-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
            <div>
                <h1 style={heading}>Auto Resource</h1>
                <h1 style={heading}>Allocator</h1>
                <br /><br />
                <p>Lorem ipsum dolor sit amet. Ut doloribus enim et</p>
                <p>nostrud ui quia velit est repellat rerum sit.</p>
                <br /><br />
                <button className='btn'>Watch Tutorial</button>
                <br />
            </div>
            <div>
                <img src={Img1} alt='Into-img' />
            </div>
        </div>
    )
}

export default Intro
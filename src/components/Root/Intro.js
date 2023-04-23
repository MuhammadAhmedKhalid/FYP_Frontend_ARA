import React, { useState } from 'react'
import Img1 from '../../assets/img1.png'

const heading = {
    fontSize: '60px'
}

function Intro() {

    const [click, setClick] = useState(false)
    const [color, setColor] = useState(false)

    const handleClick = () => setClick(!click)
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }

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
                <p>With Auto Resource Allocator, you can focus on what matters most</p>
                <p>delivering quality education, products, or services</p>
                <p>while we take care of the rest. Sign up today to see</p>
                <p>how Auto Resource Allocator can revolutionize the way you</p>
                <p>manage your staff.</p>
                <br /><br />
                <button className='btn'>Watch Tutorial</button>
                <br />
            </div>
            <div>
                <img style={{ width: 500 }} src={Img1} alt='Into-img' />
            </div>
        </div>
    )
}

export default Intro
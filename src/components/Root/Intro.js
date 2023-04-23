import React from 'react'
import Img1 from '../../assets/img1.png'
import '../Styling/IntroStyling.css'

function Intro() {

    const isMobile = window.innerWidth <= 1040;

    return (
        <div
            // className="flexbox-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
            >
            <div>
                <h1 className='heading'>Auto Resource</h1>
                <h1 className='heading'>Allocator</h1>
                <br /><br />
                {isMobile ? <img className="img" src={Img1} alt='Into-img' /> : null}
                <br/>
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
                {isMobile ? null : <img className="image" src={Img1} alt='Into-img' />}
            </div>
        </div>
    )
}

export default Intro
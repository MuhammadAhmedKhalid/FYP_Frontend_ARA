import React from 'react'
import Img1 from '../../assets/img1.png'
import '../Styling/IntroStyling.css'

function Intro() {

    const isMobile = window.innerWidth <= 1040;

    return (
        <div
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
                <p className='para1'>With Auto Resource Allocator, you can focus on what matters most</p>
                <p className='para1'>delivering quality education, products, or services</p>
                <p className='para1'>while we take care of the rest. Sign up today to see</p>
                <p className='para1'>how Auto Resource Allocator can revolutionize the way you</p>
                <p className='para1'>manage your staff.</p>
                <br />
            </div>
            <div>
                {isMobile ? null : <img className="image" src={Img1} alt='Into-img' />}
            </div>
        </div>
    )
}

export default Intro
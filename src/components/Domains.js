import React from 'react'
import Img2 from '../assets/img2.png'
import Img3 from '../assets/img3.png'
import Img4 from '../assets/img4.png'
import Img5 from '../assets/img5.png'

function Domains() {
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
            <h1 style={{ color: 'black' }}>A Platform Build For A New</h1>
            <h1 style={{ color: '#0E5E6F' }}>Way Of Allocation</h1>
            <p style={{ color: 'black', fontSize: 20 }}>Lorem ipsum dolor sit amet. Ut doloribus enim et nostrud ui quihfhhsh</p>
            <br /><br /><br />
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img2} alt='Domain-1' />
                    <button className='btn-w'>Education</button>
                </div>
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img3} alt='Domain-2' />
                    <button className='btn-w'>Factory</button>
                </div>
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img4} alt='Domain-3' />
                    <button className='btn-w'>Hospital</button>
                </div>
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img5} alt='Domain-4' />
                    <button className='btn-w'>Offices</button>
                </div>
            </div>
        </div>
    )
}

export default Domains
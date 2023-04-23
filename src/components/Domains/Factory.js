import React from 'react'
import Img7a from './../../assets/img7a.png'
import Img7b from './../../assets/img7b.png'
import '../Styling/Domains.css'

function Factory(props) {

    const isMobile = window.innerWidth <= 1040;

    const { fac_ref } = props

    return (
        <div
            ref={fac_ref}
            className="flexbox-container-y"
            style={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '110vh'
            }}
        >
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F' }} className="heading1">2. Factory</h2>
                    <br />
                    <p className='para'>Shift scheduling: Easily manage multiple shifts and schedule workers</p>
                    <p className='para'>for around-the-clock production with Auto Resource Allocator.</p>
                    <br/>
                    <p className='para'>Inventory management: Auto Resource Allocator can help manage</p>
                    <p className='para'>inventory levels and ensure that materials and supplies</p>
                    <p className='para'>are available when needed, reducing production downtime.</p>
                </div>
                {
                    isMobile ? null : <><img src={Img7a} style={{ height: 350, width: 200, marginLeft: 25, marginTop: 250 }} alt='Factory_a-img' />
                    <img src={Img7b} style={{ height: 350, width: 200 }} alt='Factory_b-img' /></>
                }
            </div>
        </div>
    )
}

export default Factory
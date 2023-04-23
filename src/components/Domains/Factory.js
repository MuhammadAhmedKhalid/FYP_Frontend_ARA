import React from 'react'
import Img7a from './../../assets/img7a.png'
import Img7b from './../../assets/img7b.png'

const pStyle = {
    color: 'black',
    fontSize: 20
}

function Factory(props) {

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
                    <h2 style={{ color: '#0E5E6F', fontSize: 22 }}>2. Factory</h2>
                    <br />
                    <p style={pStyle}>Shift scheduling: Easily manage multiple shifts and schedule workers</p>
                    <p style={pStyle}>for around-the-clock production with Auto Resource Allocator.</p>
                    <br/>
                    <p style={pStyle}>Inventory management: Auto Resource Allocator can help manage</p>
                    <p style={pStyle}>inventory levels and ensure that materials and supplies</p>
                    <p style={pStyle}>are available when needed, reducing production downtime.</p>
                </div>
                <img src={Img7a} style={{ height: 350, width: 200, marginLeft: 25, marginTop: 250 }} alt='Factory_a-img' />
                <img src={Img7b} style={{ height: 350, width: 200 }} alt='Factory_b-img' />
            </div>
        </div>
    )
}

export default Factory
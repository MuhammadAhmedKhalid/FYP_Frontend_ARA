import React from 'react'
import Img8a from './../../assets/img8a.png'
import Img8b from './../../assets/img8b.png'

const pStyle = {
    color: 'black',
    fontSize: 20
}

function Hospital(props) {

    const { hosp_ref } = props

    return (
        <div
            ref={hosp_ref}
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
                    <h2 style={{ color: '#0E5E6F', fontSize: 22 }}>3. Hospital</h2>
                    <br />
                    <p style={pStyle}>Staff replacement management: With Auto Resource Allocator,</p>
                    <p style={pStyle}>hospitals can quickly find replacement staff to fill in</p>
                    <p style={pStyle}>for absent healthcare workers, ensuring that patient</p>
                    <p style={pStyle}>care continues without interruption.</p>
                    <br/>
                    <p style={pStyle}>Scheduling and time management: Auto Resource Allocator offers</p>
                    <p style={pStyle}>powerful scheduling tools that allow administrators to manage</p>
                    <p style={pStyle}>healthcare worker schedules and make changes easily, from</p>
                    <p style={pStyle}>one central location.</p>
                </div>
                <img src={Img8a} style={{ height: 350, width: 200, marginLeft: 25 }} alt='Hospital_a-img' />
                <img src={Img8b} style={{ height: 350, width: 200, marginTop: 250 }} alt='Hospital_b-img' />
            </div>
        </div>
    )
}

export default Hospital
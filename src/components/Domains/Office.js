import React from 'react'
import Img9a from './../../assets/img9a.png'
import Img9b from './../../assets/img9b.png'

const pStyle = {
    color: 'black',
    fontSize: 20
}

function Office(props) {

    const { off_ref } = props

    return (
        <div
            ref={off_ref}
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
                    <h2 style={{ color: '#0E5E6F', fontSize: 22 }}>4. Office</h2>
                    <br />
                    <p style={pStyle}>Resource management: Use Auto Resource Allocator to manage</p>
                    <p style={pStyle}>office resources such as meeting rooms, office</p>
                    <p style={pStyle}>equipment, and supplies, to ensure that they are</p>
                    <p style={pStyle}>available when needed.</p>
                    <br/>
                    <p style={pStyle}>Scheduling and time management: Auto Resource Allocator offers</p>
                    <p style={pStyle}>powerful scheduling tools that allow managers to manage worker</p>
                    <p style={pStyle}>schedules and make changes easily, from one central location.</p>
                    <br/>
                    <p style={pStyle}>Staff replacement management: With Auto Resource Allocator, offices</p>
                    <p style={pStyle}>can quickly find replacement staff to fill in for absent workers,</p>
                    <p style={pStyle}>ensuring that business operations continue without interruption.</p>
                </div>
                <img src={Img9a} style={{ height: 350, width: 200, marginLeft: 25, marginTop: 250 }} alt='Office_a-img' />
                <img src={Img9b} style={{ height: 350, width: 200 }} alt='Office_b-img' />
            </div>
        </div>
    )
}

export default Office
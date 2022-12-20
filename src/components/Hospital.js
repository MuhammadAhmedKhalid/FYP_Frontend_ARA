import React from 'react'
import Img8a from '../assets/img8a.png'
import Img8b from '../assets/img8b.png'

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
                    <h2 style={{ color: '#0E5E6F', fontSize: 25 }}>3. Hospital</h2>
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
                <img src={Img8a} style={{ height: 300, width: 200, marginLeft: 25 }} alt='Hospital_a-img' />
                <img src={Img8b} style={{ height: 300, width: 200, marginTop: 250 }} alt='Hospital_b-img' />
            </div>
        </div>
    )
}

export default Hospital
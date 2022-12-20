import React from 'react'
import Img6a from './../../assets/img6a.png'
import Img6b from './../../assets/img6b.png'

const pStyle = {
    color: 'black',
    fontSize: 20
}

function Education(props) {

    const { edu_ref } = props

    return (
        <div
            ref={edu_ref}
            className="flexbox-container-y"
            style={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '110vh'
            }}
        >
            <h1 style={{ color: 'black' }}>Services</h1>
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F', fontSize: 22 }}>1. Education</h2>
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
                <img src={Img6a} style={{ height: 350, width: 200, marginLeft: 25 }} alt='Education_a-img' />
                <img src={Img6b} style={{ height: 350, width: 200, marginTop: 250 }} alt='Education_b-img' />
            </div>
        </div>
    )
}

export default Education
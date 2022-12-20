import React from 'react'
import Img9a from '../assets/img9a.png'
import Img9b from '../assets/img9b.png'

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
                    <h2 style={{ color: '#0E5E6F', fontSize: 25 }}>4. Office</h2>
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
                <img src={Img9a} style={{ height: 300, width: 200, marginLeft: 25, marginTop: 250 }} alt='Office_a-img' />
                <img src={Img9b} style={{ height: 300, width: 200 }} alt='Office_b-img' />
            </div>
        </div>
    )
}

export default Office
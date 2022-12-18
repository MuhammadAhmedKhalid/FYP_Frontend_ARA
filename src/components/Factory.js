import React from 'react'
import Img7a from '../assets/img7a.png'
import Img7b from '../assets/img7b.png'

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
                height: '100vh'
            }}
        >
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F', fontSize: 25 }}>2. Factory</h2>
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
                <img src={Img7a} style={{ height: 500, width: 275, marginLeft: 25, marginTop: 250 }} alt='Factory_a-img' />
                <img src={Img7b} style={{ height: 500, width: 275 }} alt='Factory_b-img' />
            </div>
        </div>
    )
}

export default Factory
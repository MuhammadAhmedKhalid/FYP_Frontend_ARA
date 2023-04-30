import React from 'react'
import Img10 from '../../assets/img10.png'
import { useSelector } from 'react-redux'

function AdminIcon() {

    const adminName = localStorage.getItem('name')

    return (
        <div style={{ marginTop: '60px', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className='flexbox-container'>
                    <div
                        style={{
                            display: 'flex',
                            width: '30.4px',
                            height: '30.4px',
                            borderRadius: '50%',
                            marginRight: '5px'
                        }}>
                        <img src={Img10} alt='Admin' />
                    </div>
                    <h2 style={{ color: '#0E5E6F' }}>{ adminName }</h2>
                </div>
            </div>
        </div>
    )
}

export default AdminIcon
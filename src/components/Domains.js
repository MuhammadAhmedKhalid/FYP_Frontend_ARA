import React from 'react'
import Img2 from '../assets/img2.png'
import Img3 from '../assets/img3.png'
import Img4 from '../assets/img4.png'
import Img5 from '../assets/img5.png'

function Domains(props) {

    const { edu_ref, fac_ref, hosp_ref, off_ref } = props

    const handleEduClick = () => {
        edu_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleFacClick = () => {
        fac_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleHospClick = () => {
        hosp_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleOffClick = () => {
        off_ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

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
            <div className="flexbox-container" >
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img2} alt='Domain-1' /><br />
                    <center><button className='btn-w' onClick={handleEduClick}>Education</button></center>
                </div>
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img3} alt='Domain-2' /><br />
                    <center><button className='btn-w' onClick={handleFacClick}>Factory</button></center>
                </div>
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img4} alt='Domain-3' /><br />
                    <center><button className='btn-w' onClick={handleHospClick}>Hospital</button></center>
                </div>
                <div className="flexbox-container-y">
                    <img style={{ width: 450 }} src={Img5} alt='Domain-4' /><br />
                    <center><button className='btn-w' onClick={handleOffClick}>Office</button></center>
                </div>
            </div>
        </div>
    )
}

export default Domains
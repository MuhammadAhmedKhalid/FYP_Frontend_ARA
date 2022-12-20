import React, { useState } from 'react'
import Img2 from '../assets/img2.png'
import Img3 from '../assets/img3.png'
import Img4 from '../assets/img4.png'
import Img5 from '../assets/img5.png'
import AdminQuestionnaire from './Admin/AdminQuestionnaire'
import AdminSimpleNavbar from './Admin/AdminSimpleNavbar'
import Footer from './Footer'


function Domains(props) {

    const { edu_ref, fac_ref, hosp_ref, off_ref, landingPage } = props

    const [domain, setDomain] = useState('Choose...')
    const [openQuestionnaireModal, setOpenQuestionnaireModal] = useState(false)

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

    const showQuestionnaireModal = (e) => {
        setDomain(e.target.value)
        setOpenQuestionnaireModal(true)
    }

    return (
        <div>
            <AdminSimpleNavbar />
            <div
                className="flexbox-container-y"
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '110vh'
                }}
            >
                <h1 style={{ color: 'black' }}>A Platform Build For A New</h1>
                <h1 style={{ color: '#0E5E6F' }}>Way Of Allocation</h1>
                <p style={{ color: 'black', fontSize: 20 }}>Lorem ipsum dolor sit amet. Ut doloribus enim et nostrud ui quihfhhsh</p>
                <br /><br /><br />
                <div className="flexbox-container" >
                    <div className="flexbox-container-y">
                        <img style={{ width: 350 }} src={Img2} alt='Domain-1' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleEduClick}>Education</button></center> :
                                <div
                                    className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Education</button>
                                    <select
                                        value={domain}
                                        className='dropdown'
                                        onChange={
                                            (e) => showQuestionnaireModal(e)}

                                    >
                                        <option value={"School"}>School</option>
                                        <option value={"University"}>University</option>
                                        <option value={"College"}>College</option>
                                    </select>
                                </div>
                        }

                    </div>
                    <div className="flexbox-container-y">
                        <img style={{ width: 350 }} src={Img3} alt='Domain-2' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleFacClick}>Factory</button></center> :
                                <div className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Factory</button>
                                    <select className='dropdown' defaultValue={"Clothing and textiles"}>
                                        <option value={"Clothing and textiles"}>Clothing and textiles</option>
                                        <option value={"Food"}>Food</option>
                                        <option value={"Metal"}>Metal</option>
                                    </select>
                                </div>
                        }
                    </div>
                    <div className="flexbox-container-y">
                        <img style={{ width: 350 }} src={Img4} alt='Domain-3' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleHospClick}>Hospital</button></center> :
                                <div className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Hospital</button>
                                    <select className='dropdown' defaultValue={"Women's hospitals"}>
                                        <option value={"Women's hospitals"}>Women's hospitals</option>
                                        <option value={"Children's hospitals"}>Children's hospitals</option>
                                        <option value={"Trauma Center Hospitals"}>Trauma Center Hospitals</option>
                                    </select>
                                </div>
                        }
                    </div>
                    <div className="flexbox-container-y">
                        <img style={{ width: 350 }} src={Img5} alt='Domain-4' /><br />
                        {
                            landingPage ?
                                <center><button className='btn-w' onClick={handleOffClick}>Office</button></center> :
                                <div className="flexbox-container-y"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <button className='domains-textField' style={{ color: '#fff', marginBottom: '15px' }}>Office</button>
                                    <select className='dropdown' defaultValue={"Private Office"}>
                                        <option value={"Private Office"}>Private Office</option>
                                        <option value={"Virtual Office"}>Virtual Office</option>
                                        <option value={"Coworking Desk"}>Coworking Desk</option>
                                    </select>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <AdminQuestionnaire openQuestionnaireModal={openQuestionnaireModal}
                setOpenQuestionnaireModal={setOpenQuestionnaireModal} />
            {
                !landingPage ? <Footer /> : ''
            }
        </div>
    )
}

export default Domains
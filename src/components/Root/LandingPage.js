import React, { useRef, useState } from 'react'
import Navbar from '../Root/Navbar'
import Domains from './Domains'
import Intro from './Intro'
import Education from '../Domains/Education'
import Factory from '../Domains/Factory'
import Hospital from '../Domains/Hospital'
import Office from '../Domains/Office'
import Footer from './Footer'

const LandingPage = () => {

    const isMobile = window.innerWidth <= 1040;

    const [landingPage, setLandingPage] = useState(true)
    const edu_ref = useRef(null);
    const fac_ref = useRef(null);
    const hosp_ref = useRef(null);
    const off_ref = useRef(null);

    return (
        <div>
            <Navbar />
            <Intro />
            {
                isMobile ? null : <Domains landingPage={landingPage} setLandingPage={setLandingPage} edu_ref={edu_ref} fac_ref={fac_ref}
                hosp_ref={hosp_ref} off_ref={off_ref} />
            }
            <Education edu_ref={edu_ref} />
            
            {
                isMobile ? null : <>
                <Factory fac_ref={fac_ref} />
                <Hospital hosp_ref={hosp_ref} />
                <Office off_ref={off_ref} /></>
            }
            <Footer />
        </div>
    )
}

export default LandingPage
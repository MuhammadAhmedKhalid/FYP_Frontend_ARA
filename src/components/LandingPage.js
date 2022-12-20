import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Domains from '../components/Domains'
import Intro from '../components/Intro'
import Education from './Domains/Education'
import Factory from './Domains/Factory'
import Hospital from './Domains/Hospital'
import Office from './Domains/Office'
import Footer from '../components/Footer'

const LandingPage = () => {

    const [landingPage, setLandingPage] = useState(true)
    const edu_ref = useRef(null);
    const fac_ref = useRef(null);
    const hosp_ref = useRef(null);
    const off_ref = useRef(null);

    return (
        <div>
            <Navbar />
            <Intro />
            <Domains landingPage={landingPage} setLandingPage={setLandingPage} edu_ref={edu_ref} fac_ref={fac_ref}
                hosp_ref={hosp_ref} off_ref={off_ref} />
            <Education edu_ref={edu_ref} />
            <Factory fac_ref={fac_ref} />
            <Hospital hosp_ref={hosp_ref} />
            <Office off_ref={off_ref} />
            <Footer />
        </div>
    )
}

export default LandingPage
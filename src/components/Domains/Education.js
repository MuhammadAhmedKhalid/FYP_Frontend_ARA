import React from 'react'
import Img6a from './../../assets/img6a.png'
import Img6b from './../../assets/img6b.png'
import '../Styling/Domains.css'

function Education(props) {

    const isMobile = window.innerWidth <= 1040;

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
                height: isMobile ? '130vh' : '110vh'
            }}
        >
            <h1 style={{ color: 'black' }} className="heading2">Services</h1>
            <div className="flexbox-container">
                <div className="flexbox-container-y">
                    <h2 style={{ color: '#0E5E6F' }} className="heading1">1. Education</h2>
                    <br />
                    <p className='para'>Automated replacement of teachers and staff: With Auto Resource</p>
                    <p className='para'>Allocator, educational institutes can easily find substitute</p>
                    <p className='para'>teachers and staff in real-time to ensure that classes</p>
                    <p className='para'>continue to run smoothly, without interruption.</p>
                    <br />
                    <p className='para'>Scheduling and time management: Auto Resource Allocator</p>
                    <p className='para'>offers powerful scheduling tools that allow</p>
                    <p className='para'> administrators to manage staff schedules and</p>
                    <p className='para'>make changes easily, from one central location.</p>
                
                {
                    isMobile ? 
                    <>
                        <div className="flexbox-container-y">
                            <h2 style={{ color: '#0E5E6F', marginTop: '10px' }} className="heading1">2. Factory</h2>
                            <br />
                            <p className='para'>Shift scheduling: Easily manage multiple shifts and schedule workers</p>
                            <p className='para'>for around-the-clock production with Auto Resource Allocator.</p>
                            <br/>
                            <p className='para'>Inventory management: Auto Resource Allocator can help manage</p>
                            <p className='para'>inventory levels and ensure that materials and supplies</p>
                            <p className='para'>are available when needed, reducing production downtime.</p>
                        </div> 
                        <div className="flexbox-container-y">
                            <h2 style={{ color: '#0E5E6F', marginTop: '10px' }} className="heading1">3. Hospital</h2>
                            <br />
                            <p className='para'>Staff replacement management: With Auto Resource Allocator,</p>
                            <p className='para'>hospitals can quickly find replacement staff to fill in</p>
                            <p className='para'>for absent healthcare workers, ensuring that patient</p>
                            <p className='para'>care continues without interruption.</p>
                            <br/>
                            <p className='para'>Scheduling and time management: Auto Resource Allocator offers</p>
                            <p className='para'>powerful scheduling tools that allow administrators to manage</p>
                            <p className='para'>healthcare worker schedules and make changes easily, from</p>
                            <p className='para'>one central location.</p>
                        </div>
                        <div className="flexbox-container-y">
                            <h2 style={{ color: '#0E5E6F', marginTop: '10px' }}  className="heading1">4. Office</h2>
                            <br />
                            <p className='para'>Resource management: Use Auto Resource Allocator to manage</p>
                            <p className='para'>office resources such as meeting rooms, office</p>
                            <p className='para'>equipment, and supplies, to ensure that they are</p>
                            <p className='para'>available when needed.</p>
                            <br/>
                            <p className='para'>Scheduling and time management: Auto Resource Allocator offers</p>
                            <p className='para'>powerful scheduling tools that allow managers to manage worker</p>
                            <p className='para'>schedules and make changes easily, from one central location.</p>
                            <br/>
                            <p className='para'>Staff replacement management: With Auto Resource Allocator, offices</p>
                            <p className='para'>can quickly find replacement staff to fill in for absent workers,</p>
                            <p className='para'>ensuring that business operations continue without interruption.</p>
                        </div>
                    </>: null
                }
                </div>
                {
                    isMobile ? null : <><img src={Img6a} style={{ height: 350, width: 200, marginLeft: 25 }} alt='Education_a-img' />
                    <img src={Img6b} style={{ height: 350, width: 200, marginTop: 250 }} alt='Education_b-img' /></>
                }
            </div>
        </div>
    )
}

export default Education
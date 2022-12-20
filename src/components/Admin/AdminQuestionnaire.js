import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import "../Styling/FormStyles.css"
import axios from 'axios'

function AdminQuestionnaire(props) {
    const { openQuestionnaireModal, setOpenQuestionnaireModal } = props
    const [countries, setCountries] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/countries')
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => { console.log(error) })
    }, [])

    const customStyles = {
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '50px',
            zIndex: 1000
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, .7)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
        },
    };
    return (
        <div>
            <Modal
                style={customStyles}
                isOpen={openQuestionnaireModal}
                onRequestClose={() => setOpenQuestionnaireModal(false)}>
                <div
                    className='flexbox-container-y'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Questionnaire</h2>
                    <form>
                        <div>
                            <h3>1. Your Institute Name?</h3>
                            <input type='text'></input>
                        </div>
                        <div>
                            <h3>2. Your Branch?</h3>
                            <input type='text'></input>
                        </div>
                        <div>
                            <h3>3. Your Country?</h3>
                            <select style={{ marginBottom: '1rem' }} className='dropdown'>
                                {
                                    countries.map((country) => (
                                        <option key={country.country_id}>{country.country_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <h3>4. Your Address?</h3>
                            <input type='text'></input>
                        </div>
                        <div>
                            <h3>5. Your Contact Number?</h3>
                            <input type='text'></input>
                        </div>
                        <div>
                            <h3>6. Upload Institute logo.</h3>
                            <input type='file'></input>
                        </div>
                    </form>
                    <Link to='/admin-home'><button className='modal-btn'>Save</button></Link>
                </div>
            </Modal>
        </div>
    )
}

export default AdminQuestionnaire
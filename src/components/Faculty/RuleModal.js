import React, { useState } from 'react'
import Modal from 'react-modal'
import '../Styling/RuleModal.css'

function RuleModal({ruleModal, setRuleModal}) {

    const customStyles = {
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

    const handleSubmit = (e) => {
        e.preventDefault();

    if (selectedItems.length >= 5) {
        console.log('Form submitted successfully!');
        console.log('Selected items:', selectedItems);
      } else {
        alert('Please select at least five days.');
      }
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
    
        if (checked) {
          setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value]);
        } else {
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => item !== value)
          );
        }
      };

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={ruleModal}
                onRequestClose={() => setRuleModal(false)}>
                     <div className='center flexbox-container-y'>
                        <h2 style={{ color: "#115868", fontSize: 20 }}>Schedule</h2>
                        <form onSubmit={handleSubmit}>
                            {
                                days.map((day, index) => 
                                <label key={index}>
                                    {day}
                                    <input
                                        key={index}
                                        type="checkbox"
                                        value={day}
                                        checked={selectedItems.includes(day)}
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                                )
                            }
                            <button className='modal-btn' style={{ marginTop: '1rem' }} type="submit">Save</button>
                        </form>
                     </div>
            </Modal>
        </div>
    )
}

export default RuleModal
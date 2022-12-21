import React, { useState } from 'react'
import '../Styling/CustomDropdownStyles.css'

function CustomDropdown() {
    const [isVisible, setIsVisible] = useState(false)
    const [itemsList, setItemsList] = useState([
        {
            name: 'Rooms',
            value: 'rooms'
        },
        {
            name: 'Faculty',
            value: 'faculty'
        },
        {
            name: 'Objects',
            value: 'objects'
        }
    ])
    const [selectedItem, setSelectedItem] = useState(null)
    const handleItems = () => {
        setIsVisible(true)
    }
    const handleItem = (val) => {
        console.log(val)
        setIsVisible(false)
    }
    return (
        <div>
            <div className='custom-dropdown'>
                <div className='custom-dropdown-selection' onClick={handleItems}>
                    {
                        selectedItem !== null ? itemsList[selectedItem].name : 'Resource'
                    }
                </div>
                {
                    isVisible &&
                    <div className='items-holder' onMouseLeave={() => setIsVisible(false)}>
                        {
                            itemsList.map((item, index) => (
                                <div key={item.value} className='dropdown-item' onClick={(val) => handleItem(item.value)}>
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default CustomDropdown
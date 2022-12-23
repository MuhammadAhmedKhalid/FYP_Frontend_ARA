import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Styling/CustomDropdownStyles.css'

function CustomDropdown(props) {
    const { items } = props
    const [isVisible, setIsVisible] = useState(false)
    const [itemsList, setItemsList] = useState(items)
    const [selectedItem, setSelectedItem] = useState(null)

    const handleItems = () => {
        setIsVisible(true)
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
                                <Link key={item.value} to={item.path}>
                                    <div className='dropdown-item'>
                                        {item.name}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default CustomDropdown
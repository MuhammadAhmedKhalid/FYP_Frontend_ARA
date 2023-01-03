import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styling/CustomDropdownStyles.css'

function CustomDropdown(props) {
    const { items } = props
    const [isVisible, setIsVisible] = useState(false)
    const [itemsList, setItemsList] = useState(items)
    const [selectedItem, setSelectedItem] = useState(null)

    const object = itemsList[0]
    const keys = [];
    for (const key in object) {
        keys.push(key);
    }

    const handleItems = () => {
        setIsVisible(true)
    }

    return (
        <div>
            <div className='custom-dropdown'>
                <div className='custom-dropdown-selection' onClick={handleItems}>
                    {
                        selectedItem !== null ? itemsList[selectedItem].name : 'Resources'
                    }
                </div>
                {
                    isVisible &&
                    <div className='items-holder' onMouseLeave={() => setIsVisible(false)}>

                        {
                            keys[2] === 'path' ?
                                <div>
                                    {
                                        itemsList.map((item, index) => (
                                            <Link key={item.value} to={item.path}>
                                                <div className='dropdown-item'>
                                                    {item.name}
                                                </div>
                                            </Link>))
                                    }
                                </div> : <div>
                                    {
                                        itemsList.map((item, index) => (
                                            <div className='dropdown-item'>
                                                {item.name}
                                            </div>))
                                    }
                                </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default CustomDropdown
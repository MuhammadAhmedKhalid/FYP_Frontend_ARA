import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styling/CustomDropdownStyles.css'
import AddLeave from '../Faculty/resources/modals/AddLeave'
import ObjectRequest from '../Faculty/resources/modals/ObjectRequest'
import RequestRoom from '../Faculty/resources/modals/RequestRoom'
import StaffRequest from '../Faculty/resources/modals/StaffRequest'

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

    const [openLeaveModal, setLeaveModal] = useState(false)
    const [openObjectModal, setObjectModal] = useState(false)
    const [openRoomModal, setRoomModal] = useState(false)
    const [openStaffModal, setStaffModal] = useState(false)

    const clicked = (item) => {
        switch (item.value) {
            case 'add leave':
                setLeaveModal(true)
                break
            case 'object request':
                setObjectModal(true)
                break
            case 'request room':
                setRoomModal(true)
                break
            case 'staff request':
                setStaffModal(true)
                break
            default:
                break
        }
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
                                            <Link key={item.value} onClick={() => clicked(item)}>
                                                <div className='dropdown-item'>
                                                    {item.name}
                                                </div>
                                            </Link>))
                                    }
                                </div>
                        }
                    </div>
                }
            </div>
            <div>
                <AddLeave openLeaveModal={openLeaveModal} setLeaveModal={setLeaveModal} />
            </div>
            <div>
                <ObjectRequest openObjectModal={openObjectModal} setObjectModal={setObjectModal} />
            </div>
            <div>
                <RequestRoom openRoomModal={openRoomModal} setRoomModal={setRoomModal} />
            </div>
            <div>
                <StaffRequest openStaffModal={openStaffModal} setStaffModal={setStaffModal} />
            </div>
        </div>
    )
}

export default CustomDropdown
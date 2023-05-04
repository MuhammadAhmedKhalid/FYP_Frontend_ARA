import React, { useState } from 'react'
import AdminNavBar from './AdminNavbar'
import '../Styling/Profile.css'

function AdminProfile() {

  const [name, setName] = useState("");
  const [institute_name, setInstituteName] = useState("")
  const [email, setEmail] = useState("");
  const [instituteType, setInstituteType] = useState("")
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isInstEditMode, setIsInstEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };
  
  const handleInstEditClick = () => {
    setIsInstEditMode(!isInstEditMode);
  };

  return (
    <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '110vh',
                background: '#fff'
            }}>
        <div>
            <AdminNavBar />
            <div className="profile">
            <h2 className="profile__title">Profile</h2>
            <div className="profile__details">
              <div className="profile__detail">
                <span className="profile__label">Name:</span>
                {isEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{name}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Email:</span>
                <span className="profile__value">{email}</span>
              </div>
            <div className="profile__actions">
              <button className="profile__edit-button" onClick={handleEditClick}>
                {isEditMode ? "Save" : "Edit"}
              </button>
            </div>
            </div>
            </div>
            <div className="profile">
            <h2 className="profile__title">Institute Detials</h2>
            <div className="profile__details">
              <div className="profile__detail">
                <span className="profile__label">Institute Name:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={institute_name}
                    onChange={(e) => setInstituteName(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{institute_name}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Institute Type:</span>
                <span className="profile__value">{instituteType}</span>
              </div>
              <div className="profile__detail">
                <span className="profile__label">Branch:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{branch}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Address:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{address}</span>
                )}
              </div>
              <div className="profile__detail">
                <span className="profile__label">Contact:</span>
                {isInstEditMode ? (
                  <input
                    type="text"
                    className="profile__input"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                ) : (
                  <span className="profile__value">{contact}</span>
                )}
              </div>
            <div className="profile__actions">
              <button className="profile__edit-button" onClick={handleInstEditClick}>
                {isInstEditMode ? "Save" : "Edit"}
              </button>
            </div>
            </div>
            </div>
        </div>

    </div>
  )
}

export default AdminProfile
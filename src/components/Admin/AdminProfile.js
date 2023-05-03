import React from 'react'
import AdminNavBar from './AdminNavbar'

function AdminProfile() {
  return (
    <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
        <div>
            <AdminNavBar />
        </div>

    </div>
  )
}

export default AdminProfile
import React from 'react'
import AdminNavBar from './AdminNavbar'

function AdminResourcesScreen() {
    return (
        <div className="flexbox-container-y"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: '#fff'
            }}>
            <AdminNavBar />
        </div>
    )
}

export default AdminResourcesScreen
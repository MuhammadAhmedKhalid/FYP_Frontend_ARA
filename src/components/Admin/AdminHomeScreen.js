import React from 'react'
import FullCalendar from '../FullCalendar'
import AdminNavBar from './AdminNavbar'

function AdminHomeScreen() {
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <FullCalendar
                        messages={{ next: '>', previous: '<', today: 'Current' }}
                        views={['month']}
                        style={{ height: 350, width: 450, marginTop: "100px", marginRight: '15px' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminHomeScreen
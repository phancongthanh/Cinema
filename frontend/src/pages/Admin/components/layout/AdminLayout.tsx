import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import RequiredAuth from '../../../../components/RequiredAuth'


const AdminLayout = () => {
  return (
    <div className="flex flex-row">
      <Sidebar/>
      <div className="flex flex-col w-screen">
        <AdminHeader/>
        <RequiredAuth allowedRole={'Admin'} />
      </div>
    </div>
  )
}

export default AdminLayout
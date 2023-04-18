import React from 'react';

import RequiredAuth from '../../../../components/RequiredAuth';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';


const AdminLayout = () => {
  return (
    <div className="flex flex-row min-h-[100dvh]">
      <Sidebar/>
      <div className="flex flex-col w-screen">
        <AdminHeader/>
        <div className="p-8">
          <RequiredAuth allowedRole={['Admin', 'Manager']} />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
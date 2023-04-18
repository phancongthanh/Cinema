import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import identity from '../../../../backend/identity';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const path = useLocation().pathname

  return (
    <div className='w-60 bg-neutral-400 min-h-full'>
      <div className='h-12 bg-neutral-300 flex items-center justify-center'>
        <Link to='/'>
          <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/logo_home.png" className='h-10 w-20' alt='logo'/>
          </Link>
        <div className='text-3xl font-serif'>{identity.getRole()}</div>
      </div>
      <div className='flex flex-col mt-5 ml-2 space-y-3'>
        {
          identity.getRole() === "Admin" &&
          <Link to={'analysis'} className={path === '/admin/analysis' || path === '/admin' ? 'btn-sidebar-select' : 'btn-sidebar'}
            style={{color: 'black', textDecoration: 'none'}}>Thống kê</Link>
        }
        <SidebarItem path={path} to={'showtimes'} label={'Quản lý suất chiếu'}/>
        <SidebarItem path={path} to={'film'} label={'Quản lý phim'}/>
        <SidebarItem path={path} to={'rooms'} label={'Quản lý phòng'}/>
        {/* <SidebarItem path={path} to={'accounts'} label={'Quản lý tài khoản'}/> */}
      </div>
    </div>
  )
}

export default Sidebar
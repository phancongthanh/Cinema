import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const path = useLocation().pathname

  return (
    <div className='w-60 bg-neutral-400 min-h-full'>
      <div className='h-12 bg-neutral-300 flex items-center justify-center'>
        <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/logo_home.png" className='h-10 w-20'/>
        <div className='text-4xl font-serif'>Admin</div>
      </div>
      <div className='flex flex-col mt-5 ml-2 space-y-3'>
        <Link to={'analysis'} className={path === '/admin/analysis' || path === '/admin' ? 'btn-sidebar-select' : 'btn-sidebar'}>Thống kê</Link>
        <SidebarItem path={path} to={'showtimes'} label={'Chỉnh sửa suất chiếu'}/>
        <SidebarItem path={path} to={'film'} label={'Chỉnh sửa phim'}/>
        <SidebarItem path={path} to={'rooms'} label={'Chỉnh sửa phòng'}/>
        <SidebarItem path={path} to={'accounts'} label={'Chỉnh sửa tài khoản'}/>
      </div>
    </div>
  )
}

export default Sidebar
import React from 'react'
import { Link } from 'react-router-dom'

const NeedLogin = () => {
  return (
    <div className="flex justify-center space-x-12">
      <img src='https://chieuphimquocgia.com.vn/Content/Images/uploaded/error.png'/>
      <div className='flex flex-col items-center justify-around'>
        <div className='text-2xl font-bold'>Bạn cần đăng nhập để thực hiện chức năng này</div>
        <div className='text-xl'>Vui lòng <Link to={'/login'} className='text-blue-600 hover:text-blue-300'>đăng nhập</Link> để tiếp tục</div>
      </div>
    </div>
  )
}

export default NeedLogin
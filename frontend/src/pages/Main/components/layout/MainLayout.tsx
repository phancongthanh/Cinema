import React, { FC, ReactNode, useState } from 'react'
import MainHeader from './MainHeader'
import Footer from './MainFooter'
import Home from '../../Home'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {

  return (
    <div className='flex flex-col min-h-[100dvh] justify-between'>
      <div>
        <MainHeader/>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout
import React, { FC, ReactNode, useState } from 'react'
import Header from './MainHeader'
import Footer from './MainFooter'
import Home from '../../Home'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {

  return (
    <div className='flex flex-col'>
        <Header/>
         <div className='h-screen'>
          <Outlet/>
          </div>
        <Footer/>
    </div>
  )
}

export default MainLayout
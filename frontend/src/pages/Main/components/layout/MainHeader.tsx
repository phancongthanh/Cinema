import { Button } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import TabPanel from './TabPanel'
import { useNavigate } from "react-router-dom";


const MainHeader = () => {

  const navigate = useNavigate();

  return (
    <>
        <div className='justify-end flex-row flex p-4 px-8 space-x-4 border-b content-center'>
            <Button className='text-2xl font-bold' variant="outlined" onClick={() => navigate('register')}>Đăng ký</Button>
            <Button className='' variant="contained" onClick={() => navigate('login')}>Đăng nhập</Button> 
        </div>
        <TabPanel/>
    </>
  )
}

export default MainHeader
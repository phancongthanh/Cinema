import { Divider } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useAuth from '../../../../hooks/useAuth';


const TabPanel  = () => {

    const {auth} = useAuth();


    const path = useLocation().pathname;

    const [value, setValue] = useState(0);
    
    useEffect(() => {
        if (path === '/home') {
            setValue(0);
        } else if (path === '/showtimes') {
            setValue(1);
        } else if (path === '/price') {
            setValue(2);
        } else if (path === '/book/chooseFilm') {
            setValue(3);
        } else if (path === '/refund') {
            setValue(4);
        } else {
            setValue(0);
        }
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div className=" bg-red-400 flex h-12">
                <Tabs value={value} onChange={handleChange} centered className=' w-screen flex-1 before' TabIndicatorProps={{style:{background:'red'}}}>
                    <Tab label={"Trang chủ"} value={0} disabled={value === 0} component={Link} to={"/home"} className={'tab'}/>
                    <Divider orientation="vertical" flexItem variant='middle'/>
                    <Tab label={"Lịch chiếu"} value={1} disabled={value === 1} component={Link} to={"/showtimes"} className={'tab'}/>
                    <Divider orientation="vertical" flexItem variant='middle'/>
                    <Tab label={"Giá vé"} value={2} disabled={value === 2} component={Link} to={'/price'} className={'tab'}/>
                    <Divider orientation="vertical" flexItem variant='middle'/>
                    {(auth !== 'Admin' && auth !== 'Manager') && <Tab label={"Đặt vé"} value={3} disabled={value === 3} component={Link} to={'book/chooseFilm'} className={'tab'}/>}
                    {auth === 'Member' && <Divider orientation="vertical" flexItem variant='middle'/>}
                    {auth === 'Member' && <Tab label={"Vé đã đặt"} value={4} disabled={value === 4} component={Link} to={'refund'} className={'tab'}/>}



                    {/* <TabItem label="Trang chủ" value={value} to="/home" tvalue={0}/> */}
                    {/* <TabItem label="Lịch chiếu" value={value} to="/showtimes" tvalue={1}/> */}
                    {/* <TabItem label="Giá vé" value={value} to='/price' tvalue={2}/> */}
                    
                </Tabs>
                {/*auth ===  'Admin' && <Link to='/admin'  className='self-center justify-self-end mr-4'>Chỉnh sửa</Link>*/}
        </div>
    )
}

export default TabPanel
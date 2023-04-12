import React, { FC, ReactNode, useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from 'react-router-dom';
import { Divider} from '@mui/material';
import TabItem from './TabItem';


const TabPanel  = () => {

    const path = useLocation().pathname;

    const [value, setValue] = useState(0);
    
    useEffect(() => {
        if (path === '/home') {
            setValue(0);
        } else if (path === '/showtimes') {
            setValue(1);
        } else if (path === '/price') {
            setValue(2);
        } else {
            setValue(0);
        }
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div className=" bg-red-200 flex h-12">
                <Tabs value={value} onChange={handleChange} centered className=' w-screen flex-1 before' TabIndicatorProps={{style:{background:'red'}}}>
                    <Tab label={"Trang chủ"} value={0} disabled={value === 0} component={Link} to={"/home"} className={'tab'}/>
                    <Divider orientation="vertical" flexItem variant='middle'/>
                    <Tab label={"Lịch chiếu"} value={1} disabled={value === 1} component={Link} to={"/showtimes"} className={'tab'}/>
                    <Divider orientation="vertical" flexItem variant='middle'/>
                    <Tab label={"Giá vé"} value={2} disabled={value === 2} component={Link} to={'/price'} className={'tab'}/>
                    <Divider orientation="vertical" flexItem variant='middle'/>
                    <Tab label={"Book"} value={3} disabled={value === 3} component={Link} to={'book/chooseFilm'} className={'tab'}/>



                    {/* <TabItem label="Trang chủ" value={value} to="/home" tvalue={0}/> */}
                    {/* <TabItem label="Lịch chiếu" value={value} to="/showtimes" tvalue={1}/> */}
                    {/* <TabItem label="Giá vé" value={value} to='/price' tvalue={2}/> */}
                    
                </Tabs>
                <Link to='/admin'  className='self-center justify-self-end mr-4'>Chỉnh sửa</Link>
        </div>
    )
}

export default TabPanel
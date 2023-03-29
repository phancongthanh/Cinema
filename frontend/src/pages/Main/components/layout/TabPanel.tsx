import React, { FC, ReactNode, useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from 'react-router-dom';


const TabPanel  = () => {

    const path = useLocation().pathname;
    console.log(path);

    useEffect(() => {
        if (path === '/') {
            setValue(0);
        } else if (path === '/showtimes') {
            setValue(1);
        } else if (path === '/price') {
            setValue(2);
        }
    }, [path]);

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    
    return (
            <Tabs value={value} onChange={handleChange} centered className='self-center'>
                <Tab label="Trang chủ" value={0} component={Link} to="/home"/>
                <Tab label="Lịch chiếu" value={1} component={Link} to="/showtimes"/>
                <Tab label="Giá vé" value={2} component={Link} to='/price'/>
                <Link to='/admin' className='self-center justify-self-end flex'>Chỉnh sửa</Link>
            </Tabs>
    )
}

export default TabPanel
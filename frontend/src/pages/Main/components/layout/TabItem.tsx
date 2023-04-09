import { Tab } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    value: number;
    label: string;
    to: string;
    tvalue: number;
}

const TabItem :FC<Props> = ({value, label, to, tvalue}) => {
    console.log(value)
  return (
    <Tab label={label} value={value} disabled={value === tvalue ? true : false} component={Link} to={to} className={value === tvalue ? 'tab-select' : 'tab'}/>
  )
}

export default TabItem
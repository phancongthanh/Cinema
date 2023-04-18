import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    path: string
    to: string
    label: string
}

const SidebarItem : FC<Props> = ({path, to, label}) => {
  return (
    <Link to={to} className={path === '/admin/' + to ? 'btn-sidebar-select' : 'btn-sidebar'}
      style={{color: 'black', textDecoration: 'none'}}>{label}</Link>
  )
}

export default SidebarItem
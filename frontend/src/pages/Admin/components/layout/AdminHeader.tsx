import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { IconButton } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import useAuth from '../../../../hooks/useAuth';
import identity from '../../../../backend/identity';
import accounts from '../../../../backend/accounts';
import AccountIcon from '../../../../components/AccountIcon';



const AdminHeader = () => {

  return (
    <div className=" bg-neutral-200 h-12 flex justify-between px-4 items-center">
      <Link to='/'>Back</Link>
      <AccountIcon />
    </div>
  )
}

export default AdminHeader
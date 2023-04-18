import React from 'react';
import { Link } from 'react-router-dom';

import AccountIcon from '../../../../components/AccountIcon';



const AdminHeader = () => {

  return (
    <div className=" bg-neutral-200 h-12 flex justify-between px-4 items-center">
      <Link to='/'>Quay lại</Link>
      <AccountIcon />
    </div>
  )
}

export default AdminHeader
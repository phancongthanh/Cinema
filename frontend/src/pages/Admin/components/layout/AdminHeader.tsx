import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <div className=" bg-neutral-200 h-12">
      <Link to='/'>Back</Link>
    </div>
  )
}

export default AdminHeader
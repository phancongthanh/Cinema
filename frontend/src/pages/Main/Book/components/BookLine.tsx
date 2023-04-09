import React, { FC } from 'react'

interface Props {
  active: boolean;
}

const BookLine : FC<Props>= ({active}) => {
  return (
    <div className={'border h-0 w-20 duration-1000 ease-in-out ' + (active ? 'border-red-500' : 'border-neutral-500 border-dashed')}></div>
  )
}

export default BookLine
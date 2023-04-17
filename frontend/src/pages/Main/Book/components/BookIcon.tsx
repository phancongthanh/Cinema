import React, { FC, ReactElement, cloneElement } from 'react'

interface Props {
    label: string;
    icon: ReactElement;
    active: boolean;
}


const BookIcon :FC<Props> = ({label, icon, active}) => {
  

  return (
    <div className={'group flex flex-col items-center relative ' + (active ? 'cursor-default' : 'cursor-pointer')}>
        <div className={'mb-4 absolute -top-8 whitespace-nowrap ' + (active ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500')}>{label}</div>
        <div className={'border flex  p-2 rounded-full aspect-square  duration-500 ease-in-out border-red-600 ' + (active ? 'bg-red-500' : ' group-hover:bg-red-500')}>
          <div className={'border border-dashed p-4 border-transparent rounded-full aspect-square duration-500 ease-in-out ' + (active ? 'border-white' : ' group-hover:border-white')}>
            {cloneElement(icon, {className:'duration-500 ease-in-out ' + (active ? 'text-white' : 'text-red-500 group-hover:text-white'), sx:{fontSize: 50}})}
          </div>
        </div>
      </div>
  )
}

export default BookIcon
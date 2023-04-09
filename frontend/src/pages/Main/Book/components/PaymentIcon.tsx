import { IconButton } from '@mui/material';
import React, { FC } from 'react'

interface Props {
    icon: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    tvalue: number;
}

const PaymentIcon : FC<Props> = ({icon, value, setValue, tvalue}) => {
  const active = value === tvalue;

  return (
    <IconButton disabled={active} onClick={() => setValue(tvalue)} className='h-24 w-24'>
        <div className={'border ' + (active ? ' border-red-400 rounded-md scale-125 transition-all' : 'border-transparent')}>
            <img src={require(`./../../../../../public/payment/${icon}.png`)}/>
        </div>
    </IconButton>
  )
}

export default PaymentIcon
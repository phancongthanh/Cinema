import React, { FC } from 'react'
import Seat from '../../../../types/Seat'
import { priceNor, priceVip } from './ChooseSeats'

interface Props {
  seat: Seat
}

const SeatInfo :FC<Props> = ({seat}) => {

  return (
    <div className='flex flex-row justify-between'>
        <div className='text-lg'>
          <div>Ghế {seat.isVip ? 'Vip' : 'Thường'}</div>
          <div> {String.fromCharCode(64 + seat.row)}-{seat.column}</div>
        </div>
      <div className='text-sm'>  
        <div>Giá:</div>
        <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(seat.isVip ? priceVip : priceNor)}</div>
      </div>
    </div>
  )
}

export default SeatInfo
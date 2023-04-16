import React, { FC } from 'react'
import Seat from '../../../../types/Seat'
import { priceNor, priceVip } from './ChooseSeats'
import Ticket from '../../../../types/Ticket'

interface Props {
  seat: Seat
  ticketsSelector: Ticket[] | null
}

const SeatInfo :FC<Props> = ({seat, ticketsSelector}) => {

  const cost =  ticketsSelector && ticketsSelector.find((ticket) => ticket.seatId === seat.seatId)?.cost

  return (
    <div className='flex flex-row justify-between'>
        <div className='text-lg'>
          <div>Ghế {seat.isVip ? 'Vip' : 'Thường'}</div>
          <div> {String.fromCharCode(64 + seat.row)}-{seat.column}</div>
        </div>
      <div className='text-sm'>  
        <div>Giá:</div>
        <div>{cost && new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cost)}</div>
      </div>
    </div>
  )
}

export default SeatInfo
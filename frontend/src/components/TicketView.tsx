import { Divider } from '@mui/material';
import React, { FC } from 'react';

import Seat from '../types/Seat';
import Ticket from '../types/Ticket';

interface Props {
    filmUrl: string | null;
    film: string;
    room: string;
    ticket: Ticket;
    startTime: Date | null;
    endTime: Date | null;
    seats: Seat[] | null;
    isCancel?: boolean
}


const TicketView : FC<Props> = ({filmUrl, film, room, ticket, startTime, endTime, seats, isCancel}) => {


  const getTimeWithFormat = (time: Date) => {
    const h = time.getHours();
    const m = time.getMinutes();
    return (h<10 ? "0"+h : h) + ":" + (m<10 ? "0"+m : m);
  }

  return (
    <div className={`flex ${isCancel ? 'bg-red-200' : 'bg-slate-200'} rounded-tr-[6rem] rounded-bl-3xl p-4 space-x-4 w-[40rem] relative`}>
  
    {filmUrl && <img src={filmUrl} height={140} width={160} alt='poster'/>}
    <Divider orientation='vertical' flexItem/>
    <div className='flex flex-col items-center relative w-[40rem]'>
      <div>{film}</div>
      <div>{room}</div>
      <div style={{fontWeight:'600', margin: '2px'}}>{isCancel ? "Trạng thái: Đã hủy vé": ""}</div>
      <div className='absolute bottom-0 left-4 flex space-x-4 items-center justify-end'>
        <div>
          <div>Mã vé: {ticket.ticketId}</div>
          <div>Ngày chiếu: {startTime && startTime.toLocaleDateString('vi-VN')}</div>
          <div>Giờ chiếu: {startTime && getTimeWithFormat(startTime)}</div>
          <div>Giờ kết thúc: {endTime && getTimeWithFormat(endTime)}</div>
        </div>
        <div className='flex flex-col items-center h-32 w-32 rounded p-1'>
          <div>Giá: </div>
          <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticket.cost)}</div>
          
          <div>Vị trí: </div>
          <div>{seats && seats.find(seat => seat.seatId === ticket.seatId)?.position}</div>
        </div>
      </div>
      <img src={'https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/logo_home.png'} height={100} width={100} className='absolute bottom-0 right-0' alt='logo'/>
    </div>
     </div>
  )
}

export default TicketView
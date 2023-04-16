import React, { useEffect } from 'react'
import Seats from './Seats';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Seat from '../../../../types/Seat';
import { Divider } from '@mui/material';
import SeatInfo from './SeatInfo';
import { usePage } from '..';
import backend from '../../../../backend';
import Room from '../../../../types/Room';
import Ticket from '../../../../types/Ticket';

export const priceNor = 100_000;
export const priceVip = 200_000;

const tseats: Seat[] = [];

for (let i = 1; i <= 100; i++) {
  const seatId = i.toString();
  const roomId = String(1);
  const row = Math.floor((i - 1) / 10) + 1;
  const column = (i - 1) % 10 + 1;
  const position = String.fromCharCode(64 + row) + column;
  const isVip = i % 10 === 3 || i % 10 === 7;
  const isAvailable = !(i % 10 === 5);

  const seat : Seat = {
    seatId,
    roomId,
    row,
    column,
    position,
    isVip,
    isAvailable,
  }

  tseats.push(seat);
}


const ChooseSeats = () => {
  const {booking , setBooking} = usePage();
  const [ticketsSelector, setTicketsSelector] = React.useState<Ticket[] | null>(booking.tickets);
  const [seatss, setSeatss] = React.useState<Seat[] | null>(null);
  const [room, setRoom] = React.useState<Room | null>(null);
  const [ticketss, setTicketss] = React.useState<Ticket[] | null>(null);
  

  useEffect(() => {
    const getData = async () => {
      const schedule = await backend.schedules.getById(booking.scheduleId)
      if(schedule) {
        setRoom(schedule.room);
        setSeatss(schedule.room.seats)
        setTicketss(schedule.tickets)
      }
    }
    getData();
  }, [])

  useEffect(() => {
    setBooking((prev) => {
      return {
        ...prev,
        tickets: ticketsSelector
      }
    })
  }, [ticketsSelector])

  

  return (
    <div className="flex min-w-[60rem] min-h-[30rem] p-4 border rounded-2xl shadow ">
      <div className="flex flex-col items-center flex-[2_2_0%]">
        <div className="mt-4 text-2xl">Chọn ghế</div>
        {room && <div className='text-2xl mr-4'>{room.address}</div>}
        <img src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img49.png" className={`mt-4 ml-4 w-[${30}rem] self-start`}/>
        
          

            <div className='mt-4 flex flex-row items-center'>
            {seatss && <Seats setTicketsSelector={setTicketsSelector} ticketsSelector={ticketsSelector} tseats={seatss} ticketss={ticketss}/>} 
            <div className='flex flex-col space-y-12 ml-8'>
              <div className='flex flex-row items-center'>
                <EventSeatIcon className='text-gray-500 mr-2' />
                <div>Ghế trống</div>
              </div>
              <div className='flex flex-row items-center'>
                <EventSeatIcon className='text-yellow-500 mr-2' />
                <div>Ghế Vip</div>
              </div>
              <div className='flex flex-row items-center'>
                <EventSeatIcon className='text-red-800 mr-2' />
                <div>Ghế đã đặt</div>
              </div>
              <div className='flex flex-row items-center'>
                <EventSeatIcon className='text-green-500 mr-2' />
                <div>Ghế đã chọn</div>
              </div>
            </div>
        </div>
      </div>
      <Divider orientation='vertical' flexItem/>
      <div className='flex flex-1 flex-col ml-4 items-center relative'>
        <div className="mt-4 text-2xl">Thông tin ghế đã đặt</div>
        <div className='mt-4 space-y-4 overflow-auto max-h-[24rem] w-72 p-4'>
          {seatss?.filter((seat) => ticketsSelector?.find((ticket) => ticket.seatId === seat.seatId)).map((seat) => (
            <SeatInfo seat={seat} ticketsSelector={ticketsSelector}/>
          ))}

        </div>
        <div className='flex flex-row absolute bottom-0'>
          <div>Tổng tiền: </div>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticketsSelector?.reduce((acc, ticket) => acc + (ticket.cost), 0) || 0)}
        </div>
       </div>
    </div>
  )
}

export default ChooseSeats

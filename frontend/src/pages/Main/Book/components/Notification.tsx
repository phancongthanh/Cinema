import { Divider } from '@mui/material';
import React, { useEffect } from 'react';

import { usePage } from '..';
import backend from '../../../../backend';
import identity from '../../../../backend/identity';
import TicketView from '../../../../components/TicketView';
import Seat from '../../../../types/Seat';
import User from '../../../../types/User';

const Notification = () => { 
  const {booking} = usePage()

  const [user, setUser] = React.useState<User | null>(null);
  const [filmUrl, setFilmUrl] = React.useState<string | null>(null);
  const [film, setFilm] = React.useState<string>('');
  const [room, setRoom] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState<Date | null>(null);
  const [endTime, setEndTime] = React.useState<Date | null>(null);
  const [seats, setSeats] = React.useState<Seat[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const userId = identity.getUserId()
      if(userId) {
        const user = await backend.users.getById(userId)
        user && setUser(user)
      }
      const schedule = await backend.schedules.getById(booking.scheduleId)
      if(schedule) {
        setRoom(schedule.room.address)
        setFilm(schedule.film.title)
        setFilmUrl(schedule.film.poster)
        setStartTime(schedule.startTime)
        setEndTime(schedule.endTime)
        setSeats(schedule.room.seats)
      }
    }
    getData();
  }, [booking])


  return (
    <div className="flex flex-col w-[60rem] h-[33rem] border rounded-2xl shadow items-center">
      <div className="mt-4 text-2xl">Cảm ơn {user?.name} đã đặt vé</div>
      <div className="flex mt-4 space-x-4">
        <div className="flex flex-col ml-4">
          <div className="text-2xl">Thông tin đặt vé</div>
          <div>Tên: {user?.name}</div>
          <div>Email: {user?.email}</div>
          <div>Số điện thoại: {user?.phoneNumber}</div>
          <div>Địa chỉ: {user?.address}</div>
        </div>
        <Divider orientation='vertical' flexItem/>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-2xl">Thông tin vé</div>
          <div className="space-y-4 overflow-auto h-[24rem] w-[42rem]">
          {booking.tickets?.map(ticket => {
            return (
              <TicketView filmUrl={filmUrl} film={film} room={room} ticket={ticket} startTime={startTime} endTime={endTime} seats={seats}/>
            )})}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
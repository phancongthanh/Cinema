import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import backend from '../backend';
import identity from '../backend/identity';
import Booking from '../types/Booking';
import ScheduleDetail from '../types/ScheduleDetail';
import Ticket from '../types/Ticket';
import TicketView from './TicketView';



interface Props {
    booking : Booking;
}

const BookingView : FC<Props> = ({booking}) => {
    const [open, setOpen] = useState(false);

    const [schedule, setSchedule] = useState<ScheduleDetail | null>(null);
    const [ticket, setTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        const getData = async () => {
            const schedule = await backend.schedules.getById(booking.scheduleId);
            if(schedule) {
                setSchedule(schedule);
                const ticket = schedule.tickets.find(ticket => ticket.ticketId === booking.ticketId)
                ticket && setTicket(ticket);
            }
        }
        getData();
    }, [booking])

    const cancel = async () => {
        const userId = identity.getUserId();
        if(userId) {
            const res = await backend.schedules.ticket.cancel(userId, booking.ticketId);
            if(res) {
                alert('Hủy vé thành công');
                setOpen(false);
                window.location.reload();
            }
        }
    }

    
  return (
    <div className='m-4 relative'>
     {(schedule && ticket) && <TicketView filmUrl={schedule.film.poster} film={schedule.film.title} room={schedule.room.address} ticket={ticket} startTime={schedule.startTime} endTime={schedule.endTime} seats={schedule.room.seats} isCancel={booking.canceled}/>}
     { !booking.canceled && <DeleteIcon color='error' className='absolute top-2 right-2 cursor-pointer' onClick={() => setOpen(!open)}/>}
        <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className='flex flex-col items-center m-12 space-y-12'>
            <div className='text-xl'>Bạn có chắc chắn muốn hủy vé này?</div>
            <div className='text-xl'>Mã vé: {booking.ticketId}</div>
            <div className='flex justify-end w-full space-x-4'>
                <Button onClick={() => setOpen(!open)} variant='contained' autoFocus>Hủy</Button>
                <Button onClick={cancel} color='error' variant='contained'>Xác nhận</Button>
            </div>
        </div>
      </Dialog>
    </div>
  )
}

export default BookingView
import React, { useEffect } from 'react'
import backend from '../../backend';
import identity from '../../backend/identity';
import Booking from '../../types/Booking';
import BookingView from '../../components/BookingView';

const Refund = () => {
  const [bookings, setBookings] = React.useState<Booking[] | null>(null);

  useEffect(() => {
    const getBookings = async () => {
      const userId = identity.getUserId();
      if(userId) {
        const books = await backend.schedules.ticket.getBookingOfUser(userId);
        if(books) {
          setBookings(books);
        }
      }
    }
    getBookings();
  }, [])

  return (
    <div className='flex items-center flex-col my-12 space-y-4'>
      <div className="font-serif text-4xl font-bold">Vé đã đặt</div>
      <img src='https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/icon-gv.png' alt="icon" />
      <div className="flex flex-wrap justify-around m-12">
      {bookings && bookings.map((booking) => (
        <BookingView key={booking.bookingId} booking={booking}/>
      ))}
      </div>
    </div>
  )
}

export default Refund
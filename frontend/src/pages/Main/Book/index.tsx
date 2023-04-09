import React, { createContext, useEffect, useState } from 'react'
import BookHeader from './components/BookHeader';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

type Booking = {
  filmId: string;
  scheduleId: string;
  seatId: string[];
  userId: string;
  cost: number;
  isPay: boolean;
}

const pageContext = createContext<{
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  page: 0,
  setPage: () => {},
  booking: {
    filmId: '',
    scheduleId: '',
    seatId: [],
    userId: '',
    cost: 0,
    isPay: false
  },
  setBooking: () => {},
  setErrorMessage: () => {},
})

  

const Book = () => {
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking>({
    filmId: '',
    scheduleId: '',
    seatId: [],
    userId: '',
    cost: 0,
    isPay: false
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const reset = () => {
    if(page === 1) {
      setBooking((prev) => {
        return {
          ...prev,
          seatId: []
        }
      })
    }
  }
  

  const prevPage = () => {
    reset();
    if (page > 0) {
      setPage(page - 1);
    }
  }

  const checkError = () => {
    if(page === 0) {
      if(booking.filmId === '') {
        setErrorMessage('Vui lòng chọn phim');
        return true;
      }
      if(booking.scheduleId === '') {
        setErrorMessage('Vui lòng chọn suất chiếu');
        return true;
      }
    }
    if(page === 1) {
      if(booking.seatId.length === 0) {
        setErrorMessage('Vui lòng chọn ghế ngồi');
        return true;
      }
    }
    if(page === 3) {
      if(!booking.isPay) {
        setErrorMessage('Vui lòng thanh toán');
        return true;
      }
    }
    setErrorMessage('');
    return false;
  }



  const nextPage = () => {
    if(checkError()) return;
    if (page < 4) {
      setPage(page + 1);
    }
  }

  const title = ['1. CHỌN PHIM', '2. CHỌN GHẾ NGỒI', '3. CẬP NHẬT THÔNG TIN', '4. THANH TOÁN', '5. THÔNG BÁO'];

  useEffect(() => {
    switch (page) {
      case 0:
        navigate('/book/chooseFilm');
        break;
      case 1:
        navigate('/book/chooseSeats');
        break;
      case 2:
        navigate('/book/userInfo');
        break;
      case 3:
        navigate('/book/payment');
        break;
      case 4:
        navigate('/book/notification');
        break;
      default:
        break;
    }
  }, [page])

  return (
    <pageContext.Provider value={{page, setPage, booking, setBooking, setErrorMessage}}>
      <div className='justify-center items-center flex-row mt-20'>
        <BookHeader/>
        <div className='flex justify-center items-center mt-20 relative'>
          <Button disabled={page <= 0} onClick={prevPage} className=' absolute -left-60'>back</Button>
          <div className='text-2xl font-bold mx-10 absolute'>{title[page]}</div>
          <Button disabled={page >= 4} onClick={nextPage} className=' absolute -right-60'>next</Button>
        </div>
        <div className='flex justify-center items-center h-16'>
          <div className='text-red-500'>{errorMessage}</div>
        </div>
        <div className='flex justify-center items-center mt-4'>
          <Outlet/>
        </div>
      </div>
    </pageContext.Provider>
  )
}

export const usePage = () => React.useContext(pageContext);

export default Book
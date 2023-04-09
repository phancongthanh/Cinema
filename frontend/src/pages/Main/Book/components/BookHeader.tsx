import React from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import BookIcon from './BookIcon';
import BookLine from './BookLine';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { usePage } from '..';

const BookHeader = () => {
  const {page} = usePage();
  const title = ['1. Chọn phim', '2. Chọn ghế ngồi', '3. Cập nhật thông tin', '4. Thanh toán', '5. Thông báo'];

  return (
    <div className="flex justify-center items-center">
        <BookIcon label={title[0]} icon={<MovieIcon />} active={page === 0}/>
        <BookLine active={page > 0}/>
        <BookIcon label={title[1]} icon={<EventSeatIcon/>} active={page === 1}/>
        <BookLine active={page > 1}/>
        <BookIcon label={title[2]} icon={<AccountBoxIcon/>} active={page === 2}/>
        <BookLine active={page > 2}/>
        <BookIcon label={title[3]} icon={<AccountBalanceWalletIcon/>} active={page === 3}/>
        <BookLine active={page > 3}/>
        <BookIcon label={title[4]} icon={<NotificationsIcon/>} active={page === 4}/>
    </div>
  )
}

export default BookHeader
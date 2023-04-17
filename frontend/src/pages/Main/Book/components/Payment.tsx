import React, { useState } from 'react'
import PaymentIcon from './PaymentIcon'
import { Button, Divider } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import { usePage } from '..';
import ClearIcon from '@mui/icons-material/Clear';
import Ticket from '../../../../types/Ticket';
import identity from '../../../../backend/identity';
import backend from '../../../../backend';

const Payment = () => {
  const {booking} = usePage()

  const [value, setValue] = useState(0);
  const [process, setProcess] = useState(0);
  const [success, SetSuccess] = useState(true);

  const Booking = async () => {
    const userId = identity.getUserId()
    if(userId) {
      booking.tickets?.forEach((ticket: Ticket) => {
        console.log("dat ve" + ticket.ticketId)
        backend.schedules.ticket.book(userId , ticket.ticketId)
        backend.schedules.ticket.pay(userId , ticket.ticketId)
      })
    }
  }

  const navigate = useNavigate();
  const {setPage} = usePage();

  const {setErrorMessage, setBooking} = usePage();

  const classList = [
    "w-44 hover:bg-green-500 hover:text-white text-green-500 border-neutral-500",
    "w-12 cursor-default animate-[spin_1s_0.5s_linear_infinite] border-neutral-500 border-l-green-500" ,
    "w-44 cursor-default bg-green-500 animate-bounce",
    "w-44 cursor-default bg-red-500 animate-bounce animate-wiggle"
  ]

  const handlePayment = () => {
    if(value === 0) {
      setErrorMessage('Vui lòng chọn phương thức thanh toán');
      return;
    }
    setErrorMessage('');
    setProcess(1);
    setTimeout(async () => {
      if(success) {
        setProcess(2);
        setBooking((prev) => {
          return {
            ...prev,
            isPay: true
          }
        })
        await Booking();
        setTimeout(() => {
          setPage(4);
        }, 3000)
      } else {
        setProcess(3);
        setTimeout(() => {
          setProcess(0);
        }, 3000)
      }
    }, 2500)
  }





  return (
    <div className="flex flex-col w-[60rem] h-[30rem] border rounded-2xl shadow items-center">
      <div className="my-4 text-2xl">Chọn phương thức thanh toán</div>
      <Divider flexItem variant='middle'/>
      <div className='grid grid-cols-3 gap-x-12 gap-y-8 my-8'>
        <PaymentIcon icon={'momo'} value={value} setValue={setValue} tvalue={1}/>
        <PaymentIcon icon={'zalopay'} value={value} setValue={setValue} tvalue={2}/>
        <PaymentIcon icon={'viettel'} value={value} setValue={setValue} tvalue={3}/>
        <PaymentIcon icon={'vnpay'} value={value} setValue={setValue} tvalue={4}/>
        <PaymentIcon icon={'paypal'} value={value} setValue={setValue} tvalue={5}/>
        <PaymentIcon icon={'visa'} value={value} setValue={setValue} tvalue={6}/>
      </div>
      <Divider flexItem variant='middle'/>
      <button className={`${classList[process]}
       border-2 h-12 rounded-full duration-[500ms] font-bold transition-all mt-8`} onClick={handlePayment}>
        {process === 0 ? 'Thanh toán' : process === 1 ? '' : process === 2 ? <DoneIcon className='text-white'/> : <ClearIcon className='text-white'/>}
       </button>
    </div>
  )
}

export default Payment
import React, { useState } from 'react'
import PaymentIcon from './PaymentIcon'
import { Button, Divider } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import { usePage } from '..';

const Payment = () => {
  const [value, setValue] = useState(0);
  const [process, setProcess] = useState(0);
  const navigate = useNavigate();
  const {setPage} = usePage();

  const {setErrorMessage, setBooking} = usePage();

  const classList = [
    "w-44 hover:bg-green-500 hover:text-white text-green-500 border-green-500",
    "w-12 cursor-default animate-[spin_1s_0.5s_linear_infinite] border-neutral-500 border-l-green-500" ,
    "w-44 cursor-default bg-green-500 animate-bounce" 
  ]

  const handlePayment = () => {
    if(value === 0) {
      setErrorMessage('Vui lòng chọn phương thức thanh toán');
      return;
    }
    setErrorMessage('');
    setProcess(1);
    setTimeout(() => {
      setProcess(2);
      setBooking((prev) => {
        return {
          ...prev,
          isPay: true
        }
      })
      setTimeout(() => {
        setPage(4);
      }, 2000)
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
      <button className={`${process === 0 ? classList[0] : process === 1 ? classList[1] : classList[2]}
       border-2 h-12 rounded-full duration-[500ms] font-bold transition-all mt-4`} onClick={handlePayment}>
        {process === 0 ? 'Thanh toán' : process === 1 ? '' : <DoneIcon className='text-white'/>}
       </button>
    </div>
  )
}

export default Payment
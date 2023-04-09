import React from 'react'
import { usePage } from '..'

const Notification = () => {
  const {booking} = usePage()

  return (
    <div className="flex flex-col w-[60rem] h-[30rem] border rounded-2xl shadow items-center">
      <div className="mt-4 text-2xl">Thông báo</div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-medium mb-2"> film ID: {booking.filmId}</h2>
        <p className="text-gray-700 mb-2">
          Schedule ID: {booking.scheduleId}
        </p>
        <p className="text-gray-700 mb-2">Seat ID: {booking.seatId.join(", ")}</p>
        <p className="text-gray-700 mb-2">User ID: {booking.userId}</p>
        <p className="text-gray-700 mb-2">Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.cost)}</p>
      </div>
    </div>
  )
}

export default Notification
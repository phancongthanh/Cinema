import React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RevenueChart = ({data}: {data: Array<{year: number, month: number, value: number}>}) => {
  const revenue = data.map(d => ({month: "T"+(d.month+1)+"/"+d.year, value:d.value}))
  return (
    <div className='h-[30rem] flex flex-col items-center'>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={revenue}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" name={'Doanh thu theo tháng trong ' + data.length + ' tháng gần đây'} stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}

export default RevenueChart
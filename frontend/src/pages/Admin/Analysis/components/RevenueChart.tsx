import React from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const revenueData = [
    { month: 'T11/2022', value: 10000 },
    { month: 'T12/2022', value: 20000 },
    { month: 'T1/2023', value: 10000 },
    { month: 'T2/2023', value: 15000 },
    { month: 'T3/2023', value: 25000 },
    { month: 'T4/2023', value: 10000 },
  ];

const RevenueChart = () => {
  return (
    <div className='h-[30rem] flex flex-col items-center'>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={revenueData}
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
        <Area type="monotone" dataKey="value" name='Doanh thu theo tháng trong 6 tháng gần đây' stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}

export default RevenueChart
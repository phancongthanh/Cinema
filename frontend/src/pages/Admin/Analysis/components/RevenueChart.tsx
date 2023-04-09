import React from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const revenueData = [
    { month: '1', value: 10000 },
    { month: '2', value: 15000 },
    { month: '3', value: 10000 },
    { month: '4', value: 25000 },
    { month: '5', value: 30000 },
    { month: '6', value: 15000 },
    { month: '7', value: 40000 },
    { month: '8', value: 45000 },
    { month: '9', value: 30000 },
    { month: '10', value: 55000 },
    { month: '11', value: 55000 },
    { month: '12', value: 65000 },
  ];

const RevenueChart = () => {
  return (
    <div className='h-[30rem]'>
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
        <Area type="monotone" dataKey="value" name='Doanh thu' stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}

export default RevenueChart
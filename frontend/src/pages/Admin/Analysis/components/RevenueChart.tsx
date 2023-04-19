import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const MonthRevenueData = [
    { text: 'T11/2022', value: 4560000 },
    { text: 'T12/2022', value: 7610000 },
    { text: 'T1/2023', value: 8160000 },
    { text: 'T2/2023', value: 6610000 },
    { text: 'T3/2023', value: 5310000 },
    { text: 'T4/2023', value: 4350000 },
  ];


const YearRevenueData = [
    { text: '2022', value: MonthRevenueData.filter(m => m.text.includes("2022")).map(m => m.value).reduce((a, b) => a + b, 0) },
    { text: '2023', value: MonthRevenueData.filter(m => m.text.includes("2023")).map(m => m.value).reduce((a, b) => a + b, 0) },
  ];

  const DayRevenueData : {text:string, value:number}[] = []
  
  for(let i = 6; i >= 0; i--) {
    const today = new Date();
    const date = new Date(today.setDate(today.getDate() - i));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const text = `${day}/${month}`;
    const value = day !== new Date().getDate() ? Math.floor(Math.random() * (200 - 50 + 1) + 150) : 100;
    DayRevenueData.push({text, value:value*1000});
  }





const RevenueChart = () => {

  const [revenueType, setRevenueType] = React.useState(1);
  const revenueTypeLabel = ['Theo ngày', 'Theo tháng', 'Theo năm']

  return (
    <div className='h-[30rem] flex flex-col space-y-4'>
      
          <FormControl sx={{ width: '20rem'}}>
          <InputLabel id="revenueType">Chọn loại biểu đồ doanh thu</InputLabel>
          <Select
            labelId="revenueType"
            value={revenueType}
            label="Chọn loại biểu đồ doanh thu"
            onChange={(e) => setRevenueType(e.target.value as number)}
          >
            <MenuItem value={0}>{revenueTypeLabel[0]}</MenuItem>
            <MenuItem value={1}>{revenueTypeLabel[1]}</MenuItem>
            <MenuItem value={2}>{revenueTypeLabel[2]}</MenuItem>
          </Select>
        </FormControl>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={revenueType === 0 ? DayRevenueData : revenueType === 1 ? MonthRevenueData : YearRevenueData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="text" />
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
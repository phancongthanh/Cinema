import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TicketCancelChart = () => {

  const data = [
    {month: "T2/2023", value1: 400, value2: 240, value3: 1240},
    {month: "T3/2023", value1: 300, value2: 139, value3: 2210},
    {month: "T4/2023", value1: 200, value2: 380, value3: 2290},
  ]
  
  return (
    <div className='h-[30rem] w-[30rem] flex flex-col items-center'>
     <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="month" />
        <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value1" name='Số vé bị hủy' fill="#FF8042" maxBarSize={40}/>
          <Bar dataKey="value2" name='Số vé trống' fill="#D3D3D3" maxBarSize={40}/>
          <Bar dataKey="value3" name='Số vé bán được' fill="#00C49F" maxBarSize={40}/>
        </BarChart>
      </ResponsiveContainer>
      Các loại vé trong 3 tháng gần đây
    </div>
  )
}

export default TicketCancelChart
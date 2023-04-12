import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data: {title: string, value: number}[] = [
    {
        title: 'The Social Network',
        value: 1000
    },
    {
        title: 'Black Panther',
        value: 200
    },
    {
        title: 'Avengers: Endgame',
        value: 300
    },
    {
        title: 'La La Land',
        value: 600
    },
    {
        title: 'The Grand Budapest Hotel',
        value: 100
    },
    {
        title: 'The Matrix',
        value: 700
    },
]

const sortedData: {title: string, value: number}[] = data.sort((a, b) => b.value - a.value)


const TicketChart = () => {
  return (
    <div className='h-[60rem] w-[30rem]'>
     <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={sortedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout='vertical'
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis type="number"/>
          <YAxis type="category" dataKey="title"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name='Doanh thu' fill="#8884d8" maxBarSize={40}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TicketChart
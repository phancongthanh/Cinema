import React, { useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import backend from '../../../../backend'
import Film from '../../../../types/Film'

const TicketChart = () => {
  const [data, setData] = React.useState<{title: string, value: number}[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const films = await backend.films.get()
      setData(films?.map((film) => {
        return {
          title: film.title,
          value: Math.floor(Math.random() * (1000 - 200 + 1) + 200)
        }
      }))
    }
    fetchData()
  }, [])
  

  const sortedData: {title: string, value: number}[] = data.sort((a, b) => b.value - a.value)

  return (
    <div className='h-[60rem] w-[30rem] flex flex-col items-center'>
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
          <Bar dataKey="value" name='Số vé' fill="#8884d8" maxBarSize={40}/>
        </BarChart>
      </ResponsiveContainer>
      Số vé bán được trong tháng
    </div>
  )
}

export default TicketChart
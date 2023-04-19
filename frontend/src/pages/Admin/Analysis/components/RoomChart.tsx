import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import backend from '../../../../backend';

const RoomChart = () => {
  const [data, setData] = React.useState<{ title: string; value: number }[]>(
    []
  );
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];


  React.useEffect(() => {
    const fetchData = async () => {
      const rooms = await backend.rooms.get();
      setData(
        rooms?.map((room) => {
          return {
            title: room.name,
            value: Math.floor(Math.random() * (2000 - 400 + 1) + 400),
          };
        })
      );
    };
    fetchData();
  }, []);


  return (
    <div className="h-[26rem] w-[30rem] flex flex-col items-center mb-16">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
          >
            {data.map((dt, index) => (
              <Cell key={`cell-${index}`} name={dt.title} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      Doanh thu theo phòng trong tháng
    </div>
  );
};

export default RoomChart;

import React, { useEffect, useState } from 'react';

import backend from '../../backend';
import Timeline from './Showtimes/components/Tilmeline';

const Showtimes = () => {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    backend.films.get()
    .then(fs => setFilms(fs.filter(f => f.schedules.some(s => s.startTime > new Date()))))
  }, [])
  
  return (
    <div style={{margin:'0% 10%'}}>
      <br />
      <br />
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial', fontSize:'36px' }}>PHIM ĐANG CHIẾU</h1>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src='https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img48.png' alt="icon" />
      <br />
    </div>
    <br />
    {films ? <Timeline films={films}></Timeline> : <></>}
    </div>
  )
}

export default Showtimes

/*
const data =[
    {imageUrl:'https://posterspy.com/wp-content/uploads/2020/06/KeanuWIPcool1.jpg',
    title:"The Matrix",
    Time:'120p',
    Origin:'Mỹ',
    Start:'1-4-2023',
    Notice:'Giới hạn trẻ em dưới 18 tuổi'
    },
    {imageUrl:'https://cdn.shopify.com/s/files/1/0037/8008/3782/products/titanic_JC12561_C_2239d2fb-29fd-4d72-9506-1cad98b96d3a-594966.jpg?v=1611688558',
    title:"Titanic",
    Time:'120p',
    Origin:'Mỹ',
    Start:'1-4-2023',
    Notice:'Giới hạn trẻ em dưới 18 tuổi'
    },
    {imageUrl:`${process.env.PUBLIC_URL}/endgame.jpg`,
    title:"Endgame",
    Time:'120p',
    Origin:'Mỹ',
    Start:'1-4-2023',
    Notice:'Giới hạn trẻ em dưới 16 tuổi'
    },
    {imageUrl:'https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    title:"Black Panther 2",
    Time:'120p',
    Origin:'Mỹ',
    Start:'1-4-2023',
    Notice:'Giới hạn trẻ em dưới 14 tuổi'
    },
    {imageUrl:'https://i.ebayimg.com/images/g/0AwAAOSwIuxiJEf6/s-l1600.jpg',
    title:"007: No Time To Die",
    Time:'120p',
    Origin:'Mỹ',
    Start:'1-4-2023',
    Notice:'Giới hạn trẻ em dưới 16 tuổi'
    },
    {imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHwvj5uezc-4dpGcvdoObXM-iLmH0mXgndkQ&usqp=CAU',
    title:"The Dark Knight Rises",
    Time:'120p',
    Origin:'Mỹ',
    Start:'1-4-2023',
    Notice:'Giới hạn trẻ em dưới 16 tuổi'
    },
    {imageUrl:'https://pbs.twimg.com/media/DQQT4TpXUAAnxDz.jpg',
    title:"Kingsman",
    Time:'120p',
    Origin:'Mỹ',
    Start:'1-4-2023',
    Notice:'Giới hạn trẻ em dưới 18 tuổi'
    },
  ];
*/
import React from 'react'
import ReactDOM from 'react-dom';
import Swiper from './Home/components/swiper';
import Movies from './Home/components/movies'
import Bar from './Home/components/bar'



function Home() {
  const images = [
  { url: `${process.env.PUBLIC_URL}/endgame.jpg`, 
  title: 'Endgame' , 
  Time: '120p',
  Date: '30-4-2023',
},
  { url: `https://cdn.shopify.com/s/files/1/0037/8008/3782/products/titanic_JC12561_C_2239d2fb-29fd-4d72-9506-1cad98b96d3a-594966.jpg?v=1611688558`, 
  title: 'Titanic',
  Time: '120p',
  Date: '30-4-2023',
 },
  { url: `https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg`, 
  title: 'Titanic',
  Time: '120p',
  Date: '30-4-2023', },
  { url: `https://posterspy.com/wp-content/uploads/2020/06/KeanuWIPcool1.jpg`, 
  title: 'Titanic',
  Time: '120p',
  Date: '30-4-2023', },
  { url: `https://i.ebayimg.com/images/g/0AwAAOSwIuxiJEf6/s-l1600.jpg`, 
  title: 'Titanic',
  Time: '120p',
  Date: '30-4-2023', },
  { url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHwvj5uezc-4dpGcvdoObXM-iLmH0mXgndkQ&usqp=CAU`, 
  title: 'Titanic',
  Time: '120p',
  Date: '30-4-2023', },
  { url: `https://pbs.twimg.com/media/DQQT4TpXUAAnxDz.jpg`, 
  title: 'Titanic',
  Time: '120p',
  Date: '30-4-2023', },
  { url: `https://img.meta.com.vn/data/image/2023/02/20/lich-chieu-phim-john-wick-4-3.jpg`, 
  title: 'Titanic',
  Time: '120p',
  Date: '30-4-2023', },

  ];
	return (
    <>
      <div >
        <Swiper/>
        <br />
        <Bar/>
        <br />
        <br />
        <Movies images={images}/>
        <br />
      </div>
    </>
	);
}

export default Home
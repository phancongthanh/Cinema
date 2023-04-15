import './grid.css';

import React, { useEffect, useState } from 'react';

const Image = ({film, index}) => {
  const porter = film.porter;
  const title = film.title;
  const time = film.time + " phút";
  const start = film.schedules[0].startTime;
  const date = start.getDate() + "-" + (start.getMonth()+1) + '-' + start.getFullYear();
  return <div key={index}>
    <a href="">
      <img src={porter} alt={`Image ${index}`} style={{ borderRadius: '10px' }} title={title} />
    </a>
    <p className="image-title">{title}</p>
    <p className='image-time'>{time}</p>
    <p className='image-date'>{date}</p>
    <div>
      <div className="book-box">
          <a href="" className="book-btn">Đặt Vé</a>
      </div>
    </div>
  </div>
}


const ImageGrid = ({ images }) => {
  const [tableWidth, setTableWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setTableWidth(window.innerWidth * 0.6);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div  className="movie" >
      <div className="image-grid"style={{ width: tableWidth }}>
      {images.map((image, index) => (<Image film={image} index={index}/>))}
      </div>
    </div>
  );
};

export default ImageGrid;
import './grid.css';

import React, { useEffect, useState } from 'react';

import FilmDetail from '../../../../types/FilmDetail';

const FilmItem = ({film}: {film: FilmDetail}) => {
  const porter = film.poster;
  const title = film.title;
  const time = film.time + " phút";
  const start = film.schedules[0].startTime;
  const date = start.getDate() + "-" + (start.getMonth()+1) + '-' + start.getFullYear();
  return <div key={film.filmId}>
    <a href="">
      <img src={porter||""} alt={film.title} style={{ borderRadius: '10px' }} title={title} />
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


const FilmView = ({ films, tab }: { films: FilmDetail[], tab: number}) => {
  const [tableWidth, setTableWidth] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setTableWidth(window.innerWidth * 0.6);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fs = films.filter(f => tab ? f.schedules[0].startTime < new Date() : f.schedules[0].startTime > new Date());

  return (
    <div  className="movie" >
      <div className="image-grid"style={{ width: tableWidth }}>
      {fs.map(f => (<FilmItem film={f}/>))}
      </div>
    </div>
  );
};

export default FilmView;
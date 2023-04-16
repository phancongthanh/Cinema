import './grid.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FilmDetail from '../../../../types/FilmDetail';

const FilmItem = ({ film }: { film: FilmDetail }) => {
  const porter = film.poster;
  const title = film.title;
  const time = film.time + " phút";
  const start = film.schedules[0].startTime;
  const date = start.getDate() + "-" + (start.getMonth() + 1) + "-" + start.getFullYear();
  return (
    <div key={film.filmId}>
      <Link to={`/filmDetail/${film.filmId}`}>
        <img
          src={porter || ""}
          alt={film.title}
          style={{ borderRadius: "10px" }}
          title={title}
        />
      </Link>
      <p className="image-title">{title}</p>
      <p className="image-time">Thời lượng: {time}</p>
      <p className="image-date">Khởi chiếu: {date}</p>
      <div>
        
        <div className="book-box">
          <Link to={`/book/chooseFilm/${film.filmId}`} className="book-btn">
            Đặt Vé
          </Link>
        </div>
      </div>
    </div>
  );
};

const FilmView = ({ films, tab }: { films: FilmDetail[]; tab: number }) => {
  const [tableWidth, setTableWidth] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setTableWidth(window.innerWidth * 0.6);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fs = tab
    ? films.filter((f) => f.releaseTime && f.releaseTime > new Date())
    : films.filter(
        (f) =>
          f.releaseTime &&
          f.releaseTime.getTime() - new Date().getTime() <
            3 * 24 * 60 * 60 * 1000
      );

  return (
    <div className="movie">
      <div className="image-grid" style={{ width: tableWidth }}>
        {fs.map(f => (<FilmItem film={f} />))}
      </div>
    </div>
  );
};

export default FilmView;

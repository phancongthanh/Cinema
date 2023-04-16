// import React from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import FilmInfor from './FilmDetails/components/FilmInfor'
import backend from '../../backend';
import React, { useEffect, useState } from 'react';

const FilmDetail = () => {
    const {filmid} = useParams()
    const [film, setFilm] = useState(null);

    useEffect(() => {
      backend.films.getById(filmid)
        .then(f => setFilm(f))
    }, [filmid])
    
  return (
    <div style={{margin:'0% 10%'}}>
      {/* FilmDetail {filmid} */}
      <br />
      <br />
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial', fontSize:'36px' }}>CHI TIẾT PHIM</h1>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src='https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img31.png' alt="icon" />
      <br />
    </div>
    <br />
      {film? <FilmInfor film={film}/> : <></> }
      <br />
      <br />
      </div>
  )
}

export default FilmDetail
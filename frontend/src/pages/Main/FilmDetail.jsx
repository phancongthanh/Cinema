import React from 'react'
import {useNavigate, useParams } from 'react-router-dom';


const FilmDetail = () => {
    const {filmid} = useParams()
    
  return (
    <div>FilmDetail {filmid}</div>
  )
}

export default FilmDetail
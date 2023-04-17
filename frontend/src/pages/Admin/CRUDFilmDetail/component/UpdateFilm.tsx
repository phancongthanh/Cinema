import React from 'react';
import { useState } from 'react';

import backend from '../../../../backend';
import FilmDetail from '../../../../types/FilmDetail';

export const UpdateFilm = ({ film, reload, back }: { film: FilmDetail, reload: () => void, back: () => void}) => {
    const [title, setTitle] = useState(film.title);
    const [category, setCategory] = useState(film.category);
    const [description, setDescription] = useState(film.description);
    const [actors, setActor] = useState(film.actors);
    const [director, setDirector] = useState(film.director);
    const [time, setTime] = useState(film.time.toString());
    const [country, setCountry] = useState(film.country);
    const [poster, setPoster] = useState(film.poster);
    const [trailer, setTrailer] = useState(film.trailer);
    
  async function handleUpdateFilm() {
      const newfilm = {
        ...film,
        title: title,
        category: category,
        description: description,
        director: director,
        actors: actors,
        time: Number(time),
        country:country,
        poster: poster,
        trailer: trailer
      };
      console.log(newfilm);
      backend.films.update(newfilm)
      .then(() => reload()).catch(e => console.log(e.message));
  }
return (
<div>
<div className='row'>
    <div className='offset-lg-3 col-lg-6'>
        <div className='container'>
            <div className='card'>

                <div className='card-title'>
                    <h2>Thêm phim</h2>
                </div>

                <div className='card-body'>

                    <div className='row'>

                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Title</label>
                                <input value ={title}  onChange={e => setTitle(e.target.value)} type='text' className='form-control'readOnly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='category'>Category</label>
                                <input value ={category} onChange={e => setCategory(e.target.value)}  type='text' className='form-control'  readOnly/>

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Description</label>
                                <input value ={description} onChange={e => setDescription(e.target.value)}  type='text' className='form-control' readOnly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Director</label>
                                <input value ={director||""}  onChange={e => setDirector(e.target.value)} type='text' className='form-control'  readOnly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Actor</label>
                                <input value ={actors||""} onChange={e => setActor(e.target.value)} type='text'  className='form-control' readOnly/>

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Time</label>
                                <input value ={time} onChange={e => setTime(e.target.value)} type='text' className='form-control' readOnly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Country</label>
                                <input value ={country}  onChange={e => setCountry(e.target.value)} type='text' className='form-control' readOnly/>

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Poster</label>
                                <input value ={poster||""} onChange={e => setPoster(e.target.value)} type='text' className='form-control' readOnly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Trailer</label>
                                <input value ={trailer||""} onChange={e => setTrailer(e.target.value)} type='text' className='form-control' readOnly />

                        </div>

                    </div>

                    <div className='col-lg-12'>
                            <div className='form-group'>
                                
                                <button onClick={() => handleUpdateFilm() }  className='btn btn-success' type='submit'>Cập Nhật</button>
                                <button onClick={back}  className='btn btn-primary' type='submit'>Quay lại</button>

                        </div>

                    </div>
                    
                </div>
            </div>

        </div>  
    </div>

</div>
</div>
</div>
  )
}

export default UpdateFilm
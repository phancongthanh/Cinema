import { useState } from 'react';

import backend from '../../../../backend';
import Film from '../../../../types/Film';

export const AddFilmDetail = ({ reload, back }: { reload: () => void, back: () => void}) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [actors, setActor] = useState("");
    const [director, setDirector] = useState("");
    const [time, setTime] = useState("");
    const [country, setCountry] = useState("");
    const [poster, setPoster] = useState("");
    const [trailer, setTrailer] = useState("");

    const handlesubmit = (e: any) => {
        e.preventDefault();
        const film:Film = {
            filmId: "",
            title: title,
            category: category,
            description: description,
            director: director,
            actors: actors,
            time: Number(time),
            country:country,
            poster: poster,
            trailer: trailer,
            tags: ""
        };
        console.log(film);
        backend.films.create(film).then(()=>reload).catch(e => console.log(e.message));
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
                                    <input value ={title} onChange={e => setTitle(e.target.value)} type='text' className='form-control' />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='category'>Category</label>
                                    <input value ={category} onChange={e => setCategory(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Description</label>
                                    <input value ={description} onChange={e => setDescription(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Director</label>
                                    <input value ={director} onChange={e => setDirector(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Actor</label>
                                    <input value ={actors} type='text' onChange={e => setActor(e.target.value)} className='form-control' />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Time</label>
                                    <input value ={time} onChange={e => setTime(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Country</label>
                                    <input value ={country} onChange={e => setCountry(e.target.value)} type='text' className='form-control'/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Poster</label>
                                    <input value ={poster} onChange={e => setPoster(e.target.value)} type='text' className='form-control'  />
 
                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Trailer</label>
                                    <input value ={trailer} onChange={e => setTrailer(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>

                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    
                                    <button onClick={handlesubmit}  className='btn btn-success' type='submit'>Tạo</button>
                                    <button className='btn btn-danger' onClick={back}>Hủy</button>

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

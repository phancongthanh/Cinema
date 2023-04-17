import React from 'react'
import { useEffect , useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {getById , update} from '../../../../backend/films';

export const UpdateFilm = (props) => {

  const sendDataToParent = () => {
    const data = "read";
    props.onData(data);

  }

  const [films, setFilms] = useState([]);
  const [filmID , setFilmID] = useState();
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState( );
    const [actors, setActor] = useState( );
    const [director, setDirector] = useState( );
    const [time, setTime] = useState( );
    const [country, setCountry] = useState( );
    const [poster, setPoster] = useState( );
    const [trailer, setTrailer] = useState( );
    const [tags , setTags] = useState( );
    



  useEffect(() => {
    async function fetchFilms() {
      const films = await getById(props.reqID);
      setFilmID(props.reqID);
      setTitle(films.title);
      setCategory(films.category);
      setDescription(films.description);
      setActor(films.actors);
      setDirector(films.director);
      setTime(films.time);
      setCountry(films.country);
      setPoster(films.poster);
      setTrailer(films.trailer);
      setTags(films.tags);

      setFilms(films);
      console.log(films)
    }
    fetchFilms();
  }, []);



  async function handleUpdateFilm() {
    
    try {

      const filmToUpdate  = {
        filmId : filmID,
        title: title,
        category: category,
        description: description,
        director: director,
        actors: actors,
        time: time,
        country:country,
        poster: poster,
        trailer: trailer,
        tags: tags


        };
      console.log(filmToUpdate);
      update(filmToUpdate);
      sendDataToParent();
      
    } catch (error) {
      console.error('Error updating film:', error);
    }
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
                                <label htmlFor='title'>ID</label>
                                <input value ={filmID}   type='text' className='form-control' readonly/>

                        </div>

                    </div>
                        
                    



                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Title</label>
                                <input value ={title}  onChange={e => setTitle(e.target.value)} type='text' className='form-control'readonly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='category'>Category</label>
                                <input value ={category} onChange={e => setCategory(e.target.value)}  type='text' className='form-control'  readonly/>

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Description</label>
                                <input value ={description} onChange={e => setDescription(e.target.value)}  type='text' className='form-control' readonly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Director</label>
                                <input value ={director}  onChange={e => setDirector(e.target.value)} type='text' className='form-control'  readonly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Actor</label>
                                <input value ={actors} onChange={e => setActor(e.target.value)} type='text'  className='form-control' readonly/>

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Time</label>
                                <input value ={time} onChange={e => setTime(e.target.value)} type='text' className='form-control' readonly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Country</label>
                                <input value ={country}  onChange={e => setCountry(e.target.value)} type='text' className='form-control' readonly/>

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Poster</label>
                                <input value ={poster} onChange={e => setPoster(e.target.value)} type='text' className='form-control' readonly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Trailer</label>
                                <input value ={trailer} onChange={e => setTrailer(e.target.value)} type='text' className='form-control' readonly />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Tags</label>
                                <input value ={tags} onChange={e => setTags(e.target.value)}  type='text' className='form-control' readonly />

                        </div>

                    </div>

                    <div className='col-lg-12'>
                            <div className='form-group'>
                                
                                <button onClick={() => handleUpdateFilm() }  className='btn btn-success' type='submit'>Cập Nhật</button>
                                <button onClick={() => sendDataToParent()}  className='btn btn-primary' type='submit'>Quay lại</button>

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
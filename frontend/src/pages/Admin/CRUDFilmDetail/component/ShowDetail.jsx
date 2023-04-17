import React from 'react'
import { useParams  } from 'react-router-dom'
import { useEffect , useState } from 'react'
import {getById}  from '../../../../backend/films';
export const ShowDetail = (props) => {

    
    const sendDataToParent = () => {
        const data = "read";
        props.onData(data);

      }

      const [films, setFilms] = useState([]);
    
      useEffect(() => {
        async function fetchFilms() {
          const films = await getById(props.reqID);
          setFilms(films);
          console.log(films)
        }
        fetchFilms();
      }, []);
    

    

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
                                    <input value ={films.filmId}  type='text' className='form-control' readonly/>

                            </div>

                        </div>
                            
                        



                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input value ={films.title}  type='text' className='form-control'readonly />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='category'>Category</label>
                                    <input value ={films.category}  type='text' className='form-control'  readonly/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Description</label>
                                    <input value ={films.description}  type='text' className='form-control' readonly />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Director</label>
                                    <input value ={films.director}  type='text' className='form-control'  readonly />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Actor</label>
                                    <input value ={films.actors} type='text'  className='form-control' readonly/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Time</label>
                                    <input value ={films.time}  type='text' className='form-control' readonly />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Country</label>
                                    <input value ={films.country}  type='text' className='form-control' readonly/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Poster</label>
                                    <input value ={films.poster}  type='text' className='form-control' readonly />
 
                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Trailer</label>
                                    <input value ={films.trailer}  type='text' className='form-control' readonly />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Tags</label>
                                    <input value ={films.tags}  type='text' className='form-control' readonly />

                            </div>

                        </div>

                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    
                                    <button onClick={sendDataToParent}  className='btn btn-success' type='submit'>Primary</button>
                                    

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


export default ShowDetail
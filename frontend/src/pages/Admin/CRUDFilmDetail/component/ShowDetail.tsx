import FilmDetail from '../../../../types/FilmDetail';

export const ShowDetail = ({film, back}: {film: FilmDetail, back: () => void}) => {
    return (
    <div>
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <div className='container'>
                <div className='card'>

                    <div className='card-title' style={{margin: '10px'}}>
                        <h2>Chi tiết phim</h2>
                    </div>


                    <div className='card-body'>

                        <div className='row'>

                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input value ={film.title}  type='text' className='form-control'readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='category'>Category</label>
                                    <input value ={film.category}  type='text' className='form-control'  readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Description</label>
                                    <input value ={film.description}  type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Director</label>
                                    <input value ={film.director||""}  type='text' className='form-control'  readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Actor</label>
                                    <input value ={film.actors||""} type='text'  className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Time</label>
                                    <input value ={film.time}  type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Country</label>
                                    <input value ={film.country}  type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Poster</label>
                                    <input value ={film.poster||""}  type='text' className='form-control' readOnly disabled/>
 
                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Trailer</label>
                                    <input value ={film.trailer||""}  type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>

                        <div className='col-lg-12' style={{marginTop: '20px'}}>
                                <div className='form-group'>
                                    
                                    <button onClick={back}  className='btn btn-success' type='submit'>Quay lại</button>
                                    
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
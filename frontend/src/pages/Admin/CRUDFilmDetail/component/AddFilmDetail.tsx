import { useCallback, useState } from 'react';

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
            trailer: trailer
        };
        console.log(film);
        backend.films.create(film).then(()=>reload()).catch(e => console.log(e.message));
    }

    const selectPoster = useCallback((e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        // Send file to backend
        backend.files.upload(formData)
        .then(fileId => setPoster(backend.files.getLink(fileId)));
    }, []);

    const selectTrailer = useCallback((e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        // Send file to backend
        backend.files.upload(formData)
        .then(fileId => setTrailer(backend.files.getLink(fileId)));
    }, []);


  return (
    <div>
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <div className='container'>
                <div className='card'>

                    <div className='card-title' style={{margin: '10px'}}>
                        <h2>Thêm phim</h2>
                    </div>


                    <div className='card-body'>

                        <div className='row'>

                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Tiêu đề</label>
                                    <input value ={title} onChange={e => setTitle(e.target.value)} type='text' className='form-control' />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='category'>Thể loại</label>
                                    <input value ={category} onChange={e => setCategory(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Mô tả</label>
                                    <input value ={description} onChange={e => setDescription(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Đạo diễn</label>
                                    <input value ={director} onChange={e => setDirector(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Diễn viên</label>
                                    <input value ={actors} type='text' onChange={e => setActor(e.target.value)} className='form-control' />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Thời gian chiếu</label>
                                    <input value ={time} onChange={e => setTime(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Xuất xứ</label>
                                    <input value ={country} onChange={e => setCountry(e.target.value)} type='text' className='form-control'/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Poster</label>
                                    <input value ={poster} onChange={e => setPoster(e.target.value)} type='text' className='form-control'/>
                                    <div>
                                        <div style={{backgroundColor: 'blue', margin: '5px 0'}} className='btn btn-success'>
                                            <label style={{cursor: 'pointer'}} htmlFor='posterInput'>Chọn file cho Poster</label>
                                        </div>
                                        <input style={{display:'none'}} type='file' id='posterInput' onChange={e => selectPoster(e)}></input>
                                    </div>
                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Trailer</label>
                                    <input value ={trailer} onChange={e => setTrailer(e.target.value)} type='text' className='form-control'  />
                                    <div>
                                        <div style={{backgroundColor: 'blue', margin: '5px 0'}} className='btn btn-success'>
                                            <label htmlFor='trailerInput'>Chọn file cho Trailer</label>
                                        </div>
                                        <input style={{display:'none'}} type='file' id='trailerInput' onChange={e => selectTrailer(e)}></input>
                                    </div>
                            </div>

                        </div>

                        <div className='col-lg-12' style={{marginTop: '20px'}}>
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

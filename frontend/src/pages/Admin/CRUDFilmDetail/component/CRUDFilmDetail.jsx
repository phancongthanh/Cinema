import React from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'
import { useEffect , useState  } from 'react'
import { get } from '../../../../backend/films';
import { Link } from 'react-router-dom';
import '../css/crud.css';

export const CRUDFilmDetail = (props ) => {
    const [state , setState] = useState("read");
    const [id , SetId] = useState();
    
    const sendIdToParent = (id) => {
        props.updateId(id);

    }

    const [films, setFilms] = useState([]);


    const sendDataToParent = (text) => {
        
        props.onData(text);
        

      }


    
      const handleClick = (text,id) => {
        console.log(text);
        console.log(id);
        sendIdToParent(id);
        sendDataToParent(text);
      }

      

    
    // const  LoadDetail = (id) => {
    //     console.log(id);
    //     const data = "detail";
    //     props.onData(data);
        
    //   }

    // const  LoadEdit = (id) => {
    //     const data = "edit";
    //     props.onData(data);
        
    //   }

    // const  LoadDelete = (id) => {
    //     console.log(id);
        
    //   }

    
    

      


    useEffect(() => {
      async function fetchFilms() {
        const films = await get();
        setFilms(films);
        console.log(films)
      }
      fetchFilms();
    });
  
  
    return (
      <div className='container'>
      <div className='card'>
          <div className='card-title'>
              <h2>Film list</h2>
              </div>
          <div className='card-body'>
                <div>
                    <a onClick={() => sendDataToParent("write")} className='btn btn-primary'>Thêm phim</a>
                </div>
          <table className='table table-bordered'>
              <thead className='bg-dark text-white'>
                  <tr>
                      <th>Title</th>
                      <th>category</th>
                      {/* <th>description</th> */}
                      <th>director</th>
                      
                      <th>country</th>
                      {/* <th>poster</th> */}
                      
                      <th>action</th>
                  </tr>    
  
              </thead>
  
              <tbody>
                {films.map((film) => (
                  <tr key={film.filmId}>
                    <td>{film.title}</td>
                    <td>{film.category}</td>
  
                    <td>{film.director}</td>
                   
                    <td>{film.country}</td>
  
                    <td>
                      <a onClick={() => handleClick("edit" ,film.filmId )} className='btn btn-success'>Sửa</a>
                      <a onClick={() => handleClick("read" , film.filmId)} className='btn btn-danger'>Xóa</a>
                      <a onClick={() => handleClick("detail" , film.filmId)} className='btn btn-primary'>Chi tiết</a>
                    </td>
                  </tr>
                ))}
              </tbody>
  
  
              </table>
  
              </div>
  
  
      </div>
  </div>
    )
  }

  export default CRUDFilmDetail
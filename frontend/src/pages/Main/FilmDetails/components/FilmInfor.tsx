
import { Link } from 'react-router-dom';
import FilmDetail from '../../../../types/FilmDetail';
import '../styles/details.css'

function FilmInFor ({ film }: { film: FilmDetail }) {
    const poster = film.poster;
    const title = film.title;
    const time = film.time + " phút";
    const start = film.schedules[0].startTime;
    const date = start.getDate() + "-" + (start.getMonth() + 1) + "-" + start.getFullYear();
    const description = film.description
    const director = film.director
    const actors = film.actors;
    const category = film.category;
    const caa = film.trailer;
    const Origin = film.country

    return (
      <div key={film.filmId}>
        <div className='details'>
            <img src={poster||""} alt='' />
            <div className="info">
                  <h3>{title}</h3>
                  <p className='info-details'>
                    <b style={{fontWeight:'400'}}>Loại phim: {category}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Thời lượng: {time}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Xuất Xứ: {Origin}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Khởi Chiếu: {date}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Diễn Viên: {actors}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Đạo diễn: {director}</b>
                    <div className='button-flex' style={{display:'flex'}} >
                    <div className="box">
                      <Link to={`/book/chooseFilm/${film.filmId}`} className="Ticket-btn">
                         Đặt Vé
                      </Link>
                    </div>
                    <div className="box">
                      <Link to={''} className="Trailer-btn">
                         Xem Trailer
                      </Link>
                    </div>
                    </div>
                    </p>
                    <div className='mar-top'>
                      <p className='describe'>
                        <b style={{fontWeight:'400'}}>{description}</b>
                      </p>
                  </div>
              </div>
        </div>
      </div>
    );
  };
  
  export default FilmInFor;
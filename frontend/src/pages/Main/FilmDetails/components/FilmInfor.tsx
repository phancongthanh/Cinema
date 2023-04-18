import '../styles/details.css';

import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import identity from '../../../../backend/identity';
import FilmDetail from '../../../../types/FilmDetail';


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
    const trailer = film.trailer;
    const Origin = film.country
  /*
    const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  }

  const handleCloseVideo = () => {
    setShowVideo(false);
  }
*/
  const onBookTicket = useCallback((e: any) => {
    if (identity.getRole() === "Manager" || identity.getRole() === "Admin") {
      e.preventDefault();
      e.stopPropagation();
      alert(identity.getRole() + " không thể đặt vé!")
    }
  },[]);

    return (
      <div key={film.filmId}>
        <div className='details'>
            <img src={poster||""} alt='' />
            <div className="info">
                  <h3>{title}</h3>
                  <p className='info-details'>
                    <b style={{fontWeight:'400'}}><span style={{fontWeight:'600'}}>Loại phim: </span> {category}</b>
                    <br />
                    <b style={{fontWeight:'400'}}><span style={{fontWeight:'600'}}>Thời lượng: </span> {time}</b>
                    <br />
                    <b style={{fontWeight:'400'}}><span style={{fontWeight:'600'}}>Xuất xứ: </span> {Origin}</b>
                    <br />
                    <b style={{fontWeight:'400'}}><span style={{fontWeight:'600'}}>Khởi chiếu: </span> {date}</b>
                    <br />
                    <b style={{fontWeight:'400'}}><span style={{fontWeight:'600'}}>Diễn viên: </span> {actors}</b>
                    <br />
                    <b style={{fontWeight:'400'}}><span style={{fontWeight:'600'}}>Đạo diễn: </span> {director}</b>
                    <div className='button-flex' style={{display:'flex'}} >
                    <div className="box">
                      <Link to={`/book/chooseFilm/${film.filmId}`} className="Ticket-btn" onClick={onBookTicket}>
                         Đặt Vé
                      </Link>
                    </div>
                    <div className="box">
                      <a className='Trailer-btn' href={`${trailer}`} target="_blank" rel="noreferrer">Xem Trailer</a>

                      {/* <Modal isOpen={showVideo} onRequestClose={handleCloseVideo} className='modal'>
                        <iframe width="840" height="472" src={`${trailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                      </Modal> */}
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
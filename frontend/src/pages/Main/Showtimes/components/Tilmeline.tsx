import '../styles/timelineMovie.css';

import FilmDetail from '../../../../types/FilmDetail';

function Timeline({films}: {films: FilmDetail[]}) {
  const day0 = new Date();
  const day1 = new Date(); day1.setDate(day0.getDate() + 1);
  const day2 = new Date(); day2.setDate(day0.getDate() + 2);
  const films0 = films.map(film => ({
    ...film,
    schedules: film.schedules.filter(s => s.startTime.toDateString() === day0.toDateString())
  })).filter(f => f.schedules.length > 0);
  const films1 = films.map(film => ({
    ...film,
    schedules: film.schedules.filter(s => s.startTime.toDateString() === day1.toDateString())
  })).filter(f => f.schedules.length > 0);
  const films2 = films.map(film => ({
    ...film,
    schedules: film.schedules.filter(s => s.startTime.toDateString() === day2.toDateString())
  })).filter(f => f.schedules.length > 0);
  return (
    <>
        <li style={{color: '#FFC000', fontSize: '20px', margin: '30px 20px 30px 0', listStyle: 'none'}}>
          <span>{day0.toLocaleDateString('vi-VN')}</span>
        </li>
        <ImageWithInfo films={films0}/>
        <li style={{color: '#FFC000', fontSize: '20px', margin: '30px 20px 30px 0', listStyle: 'none'}}>
          <span>{day1.toLocaleDateString('vi-VN')}</span>
        </li>
        <ImageWithInfo films={films1}/>
        <li style={{color: '#FFC000', fontSize: '20px', margin: '30px 20px 30px 0', listStyle: 'none'}}>
          <span>{day2.toLocaleDateString('vi-VN')}</span>
        </li>
        <ImageWithInfo films={films2}/>
    </>
  );
}

const ImageWithInfo = ({ films }: { films: FilmDetail[]}) => {
    return (
        <>
            {films.map((film, index) => (
                <div key={index}>
                    <div className="image-with-info">
                        <img src={film.poster||""} alt='' />
                        <div className="info">
                            <h3>{film.title}</h3>
                            <p>
                                <b style={{fontWeight:'400'}}>Thời lượng: {film.time}</b>
                                <br />
                                <b style={{fontWeight:'400'}}>Xuất Xứ: {film.country}</b>
                                <br />
                                <b style={{fontWeight:'400'}}>Khởi chiếu: {film.releaseTime?.toLocaleDateString("vi-VN") || ""}</b>
                                <br />
                                <b style={{fontWeight:'400'}}>Nội dung: {film.description.substring(0, 150) + "..."}</b>
                            </p>
                            <div className='mar-top'>
                                <ul>
                                    {film.schedules.map(s => 
                                        <li style={{fontWeight: '400'}}>
                                            {s.startTime.getHours()+":"+s.startTime.getMinutes()}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            ))}
        </>
    );
  };
  
  export default Timeline;
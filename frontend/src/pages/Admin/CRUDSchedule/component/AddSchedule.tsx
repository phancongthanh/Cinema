import { useState } from 'react';

import backend from '../../../../backend';
import Film from '../../../../types/Film';
import Room from '../../../../types/Room';
import Schedule from '../../../../types/Schedule';

function formatDate(date: Date) {
    let year:string|number = date.getFullYear();
    let month:string|number = date.getMonth() + 1;
    let day:string|number = date.getDate();
    let hour:string|number = date.getHours();
    let minute:string|number = date.getMinutes();
    // Thêm số 0 nếu cần thiết
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    return `${year}-${month}-${day}T${hour}:${minute}`;
}

export const AddSchedule = ({ films, rooms, reload, back }:
    { films: Film[], rooms: Room[], reload: () => void, back: () => void}) => {
    
    const [roomId, setRoom] = useState(rooms.length > 0 ? rooms[0].roomId : "");
    const [filmId, setFilm] = useState(films.length > 0 ? films[0].filmId : "");
    const [date, setDate] = useState(formatDate(new Date()));

    const handlesubmit = (e: any) => {
        e.preventDefault();
        const start = new Date(date);
        const end = start.getTime() + (Math.round((films.find(f => f.filmId === filmId)?.time || 0) / 30) * 30 + 30)*60*1000;
        const schedule:Schedule = {
            scheduleId: "",
            roomId,
            filmId,
            startTime: start,
            endTime: new Date(end)
        };

        console.log(schedule);
        backend.schedules.create(schedule, 50000, 60000).then(()=>reload()).catch(e => console.log(e.message));
    }

  return (
    <div>
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <div className='container'>
                <div className='card'>

                    <div className='card-title' style={{margin: '10px'}}>
                        <h2>Tạo xuất chiếu phim</h2>
                    </div>


                    <div className='card-body'>

                        <div className='row'>

                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Chọn phim chiếu</label>
                                    <select value ={filmId} onChange={e => setFilm(e.target.value)} className='form-control'>
                                        {films.map(f => (<option value={f.filmId}>{f.title}</option>))}
                                    </select>
                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='address'>Chọn phòng chiếu</label>
                                    <select value ={roomId} onChange={e => setRoom(e.target.value)} className='form-control'>
                                        {rooms.map(r => (<option value={r.roomId}>{r.name}</option>))}
                                    </select>
                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='row'>Khởi chiếu</label>
                                    <input value ={date} onChange={e => setDate(e.target.value)} type='datetime-local' className='form-control'  />

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

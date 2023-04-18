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

export const UpdateSchedule = ({ film, room, schedule, reload, back }: {
    film: Film, room: Room, schedule: Schedule, reload: () => void, back: () => void}) => {

    const [date, setDate] = useState(formatDate(schedule.startTime));
    
    async function handleUpdateSchedule() {
        const start = new Date(date);
        const end = start.getTime() + (Math.round((film.time || 0) / 30) * 30 + 30)*60*1000;
        backend.schedules.update(schedule.scheduleId, start, new Date(end))
        .then(() => reload()).catch(e => console.log(e.message));
    }

return (
<div>
<div className='row'>
    <div className='offset-lg-3 col-lg-6'>
        <div className='container'>
            <div className='card'>

                <div className='card-title' style={{margin: '10px'}}>
                    <h2>Chỉnh sửa lịch chiếu</h2>
                </div>

                <div className='card-body'>

                <div className='row'>

                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Phim</label>
                        <input value ={film.title} type='text' className='form-control' readOnly disabled/>

                    </div>

                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label htmlFor='time'>Thời lượng</label>
                        <input value ={film.time + " phút"} type='text' className='form-control' readOnly disabled/>

                    </div>

                </div>
                <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='roomName'>Tên phòng chiếu phim</label>
                                    <input value ={room.name}  type='text' className='form-control'  readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='roomAddress'>Vị trí phòng</label>
                                    <input value ={room.address}  type='text' className='form-control'  readOnly disabled/>

                            </div>

                        </div>                <div className='col-lg-12'>
                        <div className='form-group'>
                            <label htmlFor='row'>Khởi chiếu</label>
                            <input value ={date} onChange={e => setDate(e.target.value)} type='datetime-local' className='form-control'  />

                    </div>

                </div>
                <div className='col-lg-12' style={{marginTop: '20px'}}>
                    <div className='form-group'>
                            
                        <button onClick={() => handleUpdateSchedule() }  className='btn btn-success' type='submit'>Cập Nhật</button>
                        <button onClick={back}  className='btn btn-primary' type='submit'>Quay lại</button>

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

export default UpdateSchedule
import { useEffect, useState } from 'react';

import backend from '../../../../backend';
import ScheduleDetail from '../../../../types/ScheduleDetail';
import { TicketStatus } from '../../../../types/Ticket';

export const ShowDetail = ({scheduleId, back}: {scheduleId: string, back: () => void}) => {
    const [schedule, setSchedule] = useState<ScheduleDetail|null>(null);

    useEffect(() => {
        backend.schedules.getById(scheduleId).then(detail => setSchedule(detail));
    }, [scheduleId])

    return (
    <div>
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <div className='container'>
                <div className='card'>

                    <div className='card-title' style={{margin: '10px'}}>
                        <h2>Chi tiết xuất chiếu</h2>
                    </div>


                    <div className='card-body'>

                        <div className='row'>

                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Phim</label>
                                    <input value ={schedule?.film.title}  type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='time'>Thời lượng</label>
                                <input value ={schedule?.film.time + " phút"} type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='time'>Thời gian chiếu</label>
                                <input value ={schedule?.startTime.toLocaleString("vi-VN")} type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='roomName'>Tên phòng chiếu phim</label>
                                    <input value ={schedule?.room.name}  type='text' className='form-control'  readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='roomAddress'>Vị trí phòng</label>
                                    <input value ={schedule?.room.address}  type='text' className='form-control'  readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='address'>Tổng số vé</label>
                                <input value ={schedule?.tickets.length} type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='address'>Số vé đã bán</label>
                                <input value={schedule?.tickets.filter(t => t.status !== TicketStatus.Available).length} type='text' className='form-control' readOnly disabled/>

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
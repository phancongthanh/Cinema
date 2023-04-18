import { useState } from 'react';

import backend from '../../../../backend';
import Room from '../../../../types/Room';

export const UpdateRoom = ({ room, reload, back }: { room: Room, reload: () => void, back: () => void}) => {
    const [name, setName] = useState(room.name);
    const [address, setAddress] = useState(room.address);
    
    async function handleUpdateRoom() {
        const newRoom = {
            ...room,
            name,
            address
        };
        console.log(newRoom);
        backend.rooms.update(newRoom)
        .then(() => reload()).catch(e => console.log(e.message));
    }

return (
<div>
<div className='row'>
    <div className='offset-lg-3 col-lg-6'>
        <div className='container'>
            <div className='card'>

                <div className='card-title' style={{margin: '10px'}}>
                    <h2>Chỉnh sửa phim</h2>
                </div>

                <div className='card-body'>

                <div className='row'>

                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Tên phòng</label>
                        <input value ={name} onChange={e => setName(e.target.value)} type='text' className='form-control' />

                    </div>

                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label htmlFor='address'>Ví trị phòng</label>
                        <input value ={address} onChange={e => setAddress(e.target.value)} type='text' className='form-control'  />

                    </div>

                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label htmlFor='address'>Số ghế</label>
                        <input value ={room.seats.length} type='text' className='form-control' readOnly disabled/>

                    </div>

                </div>
                <div className='col-lg-12' style={{marginTop: '20px'}}>
                    <div className='form-group'>
                            
                        <button onClick={() => handleUpdateRoom() }  className='btn btn-success' type='submit'>Cập Nhật</button>
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

export default UpdateRoom
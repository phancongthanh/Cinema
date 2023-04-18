import './CRUDRoom/css/crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useCallback, useEffect, useState } from 'react';

import backend from '../../backend';
import Room from '../../types/Room';
import { AddRoom } from './CRUDRoom/component/AddRoom';
import { CRUDRoom } from './CRUDRoom/component/CRUDRoom';
import { ShowDetail } from './CRUDRoom/component/ShowDetail';
import UpdateRoom from './CRUDRoom/component/UpdateRoom';

const RoomsEdit = () => {

    const [rooms, setRooms] = useState<Room[]>([]);

    const [view, changeView] = useState<{tab: "read"|"write"|"detail"|"edit", roomId: string}>({tab: "read", roomId: ""});
  
    useEffect(()=>{
        backend.rooms.get()
        .then(rooms => setRooms(rooms));
    }, []);

    const reload = useCallback(()=> {
        changeView({tab: "read", roomId: ""});
        backend.rooms.get()
        .then(rooms => setRooms(rooms));
    }, []);

    const back = useCallback(()=>changeView({tab: "read", roomId: ""}), []);

    const room = rooms.find(f => f.roomId === view.roomId);

    switch (view.tab) {
        case "write": return <AddRoom reload={reload} back={back}/>;
        case "detail":
            if (!room) {
                back();
                return <></>;
            }
            return <ShowDetail room={room} back={back}/>;
        case "edit":
            if (!room) {
                back();
                return <></>;
            }
            return <UpdateRoom room={room} reload={reload} back={back}/>;
        default: return <CRUDRoom rooms={rooms} changeView={changeView}/>
    }
}

export default RoomsEdit
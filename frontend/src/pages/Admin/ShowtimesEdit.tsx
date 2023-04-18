import './CRUDSchedule/css/crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { useCallback, useEffect, useState } from 'react';

import backend from '../../backend';
import Film from '../../types/Film';
import Room from '../../types/Room';
import Schedule from '../../types/Schedule';
import { AddSchedule } from './CRUDSchedule/component/AddSchedule';
import { CRUDSchedule } from './CRUDSchedule/component/CRUDSchedule';
import { ShowDetail } from './CRUDSchedule/component/ShowDetail';
import UpdateSchedule from './CRUDSchedule/component/UpdateSchedule';

export interface Data {
    films: Film[],
    rooms: Room[],
    schedules: Schedule[]
}

const ShowtimesEdit = () => {
    const [data, setData] = useState<Data>({
        films: [],
        rooms: [],
        schedules: []
    });

    const [view, changeView] = useState<{tab: "read"|"write"|"detail"|"edit", scheduleId: string}>({tab: "read", scheduleId: ""});
  
    useEffect(()=>{
        async function getData() {
            const films = await backend.films.get();
            const rooms = await backend.rooms.get();
            const schedules = await backend.schedules.get();
            setData({films, rooms, schedules});
        }
        getData();
    }, []);

    const reload = ()=> {
        changeView({tab: "read", scheduleId: ""});
        backend.schedules.get()
        .then(schedules => setData({...data, schedules}));
    };

    const back = useCallback(()=>changeView({tab: "read", scheduleId: ""}), []);

    const schedule = data.schedules.find(f => f.scheduleId === view.scheduleId);
    const film = schedule && data.films.find(f => f.filmId === schedule.filmId);
    const room = schedule && data.rooms.find(r => r.roomId === schedule.roomId);

    switch (view.tab) {
        case "write": return <AddSchedule films={data.films} rooms={data.rooms} reload={reload} back={back}/>;
        case "detail":
            if (!schedule) {
                back();
                return <></>;
            }
            return <ShowDetail scheduleId={schedule.scheduleId} back={back}/>;
        case "edit":
            if (!schedule || !room || !film) {
                back();
                return <></>;
            }
            return <UpdateSchedule film={film} room={room} schedule={schedule} reload={reload} back={back}/>;
        default: return <CRUDSchedule data={data} changeView={changeView}/>
    }
}

export default ShowtimesEdit
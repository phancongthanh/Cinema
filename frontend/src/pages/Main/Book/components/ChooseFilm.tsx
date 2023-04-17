import React, { useEffect, useState } from 'react';

import { usePage } from '..';
import backend from '../../../../backend';
import films from '../../../../backend/films';
import FilmDetail from '../../../../types/FilmDetail';
import Schedule from '../../../../types/Schedule';

const getTimeWithFormat = (time: Date) => {
  const h = time.getHours();
  const m = time.getMinutes();
  return (h<10 ? "0"+h : h) + ":" + (m<10 ? "0"+m : m);
}

const ChooseFilm = () => {
  const {booking, setBooking} = usePage();
  const [filmss, setFilmss] = useState<FilmDetail[] | null>(null);
  const [scheduless, setScheduless] = useState<Schedule[] | null>(null);

  const [selectedFilm, setSelectedFilm] = useState<{filmId: string, title: string}| null | undefined>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null | undefined>(null);
  const [filterDate, seFilterDate] = useState<Date | null>(null);

  useEffect(() => {
    const getFilms = async () => {
      const films = await backend.films.get()
      if(films) {
        setFilmss(films);
        setSelectedFilm(booking.filmId ? films.find((film) => film.filmId === booking.filmId): null);
      }
    }
    getFilms();
  }, [])

  useEffect(() => {
    const getSchedules = async () => {
      const schedules = await backend.schedules.get();
      if(schedules) {
        setScheduless(schedules.filter((schedule) => schedule.filmId === selectedFilm?.filmId));
        setSelectedSchedule(booking.scheduleId ? schedules.find((schedule) => schedule.scheduleId === booking.scheduleId) : null);

      }
    }
    getSchedules();
  }, [selectedFilm])


  const handleFilmSelect = (film : {filmId: string, title: string}) => {
    setSelectedFilm(film);
    setBooking((prev) => {
      return {
        ...prev,
        filmId: film.filmId
      }
    }
    )
  };

  const handleScheduleSelect = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setBooking((prev) => {
      return {
        ...prev,
        scheduleId: schedule.scheduleId
      }
    }
    )
  };



  return ( 
    <div>
    <div className="space-x-8 flex">
      <div className="flex flex-col w-96 h-96 border rounded-2xl shadow items-center">
        <div className="mt-4 text-2xl">Chọn phim</div>
        <ul className="w-full max-w-xs h-72 overflow-auto m-4">
        {filmss && filmss.map((film) => (
          <li
            key={film.filmId}
            className={`cursor-pointer py-2 px-4 mb-2 rounded-lg ${
              selectedFilm?.filmId === film.filmId
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => handleFilmSelect(film)}
          >
            {film.title}
          </li>
        ))}
      </ul>
      {/* {selectedFilm && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">{selectedFilm.title}</h2>
          <p>Selected film ID: {selectedFilm.filmId}</p>
        </div>
      )} */}
      </div>
      <div className="flex flex-col w-96 h-96 border rounded-2xl shadow items-center">
        <div className="mt-4 text-2xl">Chọn suất chiếu</div>
        <div className="flex items-center my-4">
        <input
          type="date"
          placeholder="dd-mm-yyyy"
          value={filterDate ? filterDate.toISOString().substr(0, 10) : ''}
          onChange={(e) => seFilterDate(new Date(e.target.value))}
        />
      </div>
        <ul className="w-full max-w-xs h-64 flex flex-col overflow-auto">
        {scheduless && scheduless.filter(schedule => filterDate ? schedule.startTime.getDate() === filterDate.getDate() : schedule).filter(schedule => (schedule.startTime.getTime() - new Date().getTime()) > 0).sort((a,b) => a.startTime.getTime() - b.startTime.getTime()).map((schedule) => (

        <li
          key={schedule.scheduleId}
          className={`h-12 cursor-pointer py-2 px-4 rounded-lg ${
            selectedSchedule?.scheduleId === schedule.scheduleId
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => handleScheduleSelect(schedule)}
        >
          {schedule.startTime.toLocaleDateString('vi-VN') + " - " + getTimeWithFormat(schedule.startTime)}
        </li>
        ))}
      </ul>
      {/* {selectedSchedule && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">{selectedSchedule.filmId}</h2>
          <p>Selected schedule ID: {selectedSchedule.scheduleId}</p>
        </div>
      )} */}
      </div>
    </div>
    </div>
  )
}

export default ChooseFilm
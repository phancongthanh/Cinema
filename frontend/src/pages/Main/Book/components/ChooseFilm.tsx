import React, { useState } from 'react'
import { usePage } from '..';
import Schedule from '../../../../types/Schedule';

const films = [
  {
    filmId: '1',
    title: "The Social Network"
  },
  {
    filmId: '2',
    title: "Black Panther"
  },
  {
    filmId: '3',
    title: "Avengers: Endgame"
  },
  {
    filmId: '4',
    title: "La La Land"
  },
  {
    filmId: '5',
    title: "The Grand Budapest Hotel"
  },
  {
    filmId: "6",
    title: "The Matrix",
  },
  {
    filmId: "7",
    title: "Interstellar",
  },
  {
    filmId: "8",
    title: "Jurassic Park",
  },
  {
    filmId: "9",
    title: "Titanic",
  },
  {
    filmId: "10",
    title: "Star Wars: Episode IV - A New Hope",
  },
  {
    filmId: "11",
    title: "Back to the Future",
  },
]

const schedules = [
  {
    scheduleId: "1",
    roomId: "1",
    filmId: "1",
    startTime: new Date("2023-04-09T10:30:00Z"),
    endTime: new Date("2023-04-09T12:30:00Z")
  },
  {
    scheduleId: "2",
    roomId: "2",
    filmId: "2",
    startTime: new Date("2023-04-11T14:00:00Z"),
    endTime: new Date("2023-04-11T16:00:00Z")
  },
  {
    scheduleId: "3",
    roomId: "1",
    filmId: "1",
    startTime: new Date("2023-04-12T18:30:00Z"),
    endTime: new Date("2023-04-12T20:30:00Z")
  },
  {
    scheduleId: "4",
    roomId: "1",
    filmId: "1",
    startTime: new Date("2023-04-13T21:00:00Z"),
    endTime: new Date("2023-04-13T23:00:00Z")
  },
  {
    scheduleId: "5",
    roomId: "1",
    filmId: "2",
    startTime: new Date("2023-04-14T13:00:00Z"),
    endTime: new Date("2023-04-14T15:00:00Z")
  }
]

const date = new Date(2023, 3, 9);

for (let i = 1; i <= 12; i++) {
  const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9 + i, 0, 0); 
  const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9 + i + 2, 0, 0); 

  schedules.push({
    scheduleId: `${i + 10}`,
    roomId: "1",
    filmId: "1",
    startTime: startTime,
    endTime: endTime,
  });
}

const ChooseFilm = () => {
  const {booking, setBooking} = usePage();

  const [selectedFilm, setSelectedFilm] = useState<{filmId: string, title: string}| null | undefined>(booking.filmId ? films.find((film) => film.filmId === booking.filmId) : null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null | undefined>(booking.scheduleId ? schedules.find((schedule) => schedule.scheduleId === booking.scheduleId) : null);
  const [filterDate, seFilterDate] = useState<Date>(new Date());

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
        {films.map((film) => (
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
          value={filterDate.toISOString().substr(0, 10)}
          onChange={(e) => seFilterDate(new Date(e.target.value))}
        />
      </div>
        <ul className="w-full max-w-xs h-64 flex flex-row flex-wrap overflow-auto">
        {selectedFilm && schedules.filter(
      (schedule) =>
        schedule.filmId === selectedFilm?.filmId &&
        schedule.startTime.getFullYear() === filterDate.getFullYear() &&
        schedule.startTime.getMonth() === filterDate.getMonth() &&
        schedule.startTime.getDate() === filterDate.getDate()
    ).sort((a, b) => a.startTime.getTime() - b.startTime.getTime()).map((schedule) => (
      <li
        key={schedule.scheduleId}
        className={`w-20 h-12 cursor-pointer py-2 px-4 rounded-lg ${
          selectedSchedule?.scheduleId === schedule.scheduleId
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => handleScheduleSelect(schedule)}
      >
        {schedule.startTime.getHours()} : {schedule.startTime.getMinutes()}
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
import './CRUDFilmDetail/css/crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useCallback, useEffect, useState } from 'react';

import backend from '../../backend';
import FilmDetail from '../../types/FilmDetail';
import { AddFilmDetail } from './CRUDFilmDetail/component/AddFilmDetail';
import { CRUDFilmDetail } from './CRUDFilmDetail/component/CRUDFilmDetail';
import { ShowDetail } from './CRUDFilmDetail/component/ShowDetail';
import { UpdateFilm } from './CRUDFilmDetail/component/UpdateFilm';

const FilmsEdit = () => {

    const [films, setFilms] = useState<FilmDetail[]>([]);

    const [view, changeView] = useState<{tab: "read"|"write"|"detail"|"edit", filmId: string}>({tab: "read", filmId: ""});
  
    useEffect(()=>{
        backend.films.get()
        .then(films => setFilms(films));
    }, []);

    const reload = useCallback(()=> {
        changeView({tab: "read", filmId: ""});
        backend.films.get()
        .then(films => setFilms(films));
    }, []);

    const back = useCallback(()=>changeView({tab: "read", filmId: ""}), []);

    const film = films.find(f => f.filmId === view.filmId);

    switch (view.tab) {
        case "write": return <AddFilmDetail reload={reload} back={back}/>;
        case "detail":
            if (!film) {
                back();
                return <></>;
            }
            return <ShowDetail film={film} back={back}/>;
        case "edit":
            if (!film) {
                back();
                return <></>;
            }
            return <UpdateFilm film={film} reload={reload} back={back}/>;
        default: return <CRUDFilmDetail films={films} changeView={changeView}/>
    }
}

export default FilmsEdit
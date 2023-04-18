import React from 'react';

import FilmDetail from '../../../../types/FilmDetail';

export const CRUDFilmDetail = ({ films, changeView } : {films: FilmDetail[], changeView: (view: {tab: "read"|"write"|"detail"|"edit", filmId: string})=>void}) => {
    
    const handleClick = (tab: "read"|"write"|"detail"|"edit", filmId: string) => {
        console.log(tab);
        console.log(filmId);
        changeView({tab, filmId});
    }

    return (
        <div className='container'>
        <div className='card'>
            <div className='card-title' style={{margin: '10px'}}>
                <h2>Danh sách phim</h2>
            </div>
            <div className='card-body'>
                <div>
                    <span style={{margin: '5px 0'}} onClick={() => handleClick("write", "")} className='btn btn-primary'>Thêm phim</span>
                </div>
                <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Thể loại</th>
                            {/* <th>description</th> */}
                            <th>Đạo diễn</th>  
                            <th>Xuất xứ</th>
                            {/* <th>poster</th> */}
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map((film) => (
                            <tr key={film.filmId}>
                                <td>{film.title}</td>
                                <td>{film.category}</td>
            
                                <td>{film.director}</td>
                            
                                <td>{film.country}</td>
            
                                <td>
                                <span onClick={() => handleClick("edit" ,film.filmId )} className='btn btn-success'>Sửa</span>
                                <span onClick={() => handleClick("detail" , film.filmId)} className='btn btn-primary'>Chi tiết</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default CRUDFilmDetail
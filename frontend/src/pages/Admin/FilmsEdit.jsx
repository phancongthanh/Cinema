import React from 'react'
import { useEffect , useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import {CRUDFilmDetail } from './CRUDFilmDetail/component/CRUDFilmDetail'
import {AddFilmDetail} from './CRUDFilmDetail/component/AddFilmDetail'
import {ShowDetail} from './CRUDFilmDetail/component/ShowDetail'
import {UpdateFilm} from './CRUDFilmDetail/component/UpdateFilm'
const FilmsEdit = () => {

  const [data, setData] = useState("read");
  const [id, setId] = useState();


  const handleId = (newId) => {
    setId(newId);
    console.log(id)
  }

  const handleData = (newData) => {
    setData(newData);
    console.log(data)
  }

 

  

  if(data === "write"){
    return (
      <AddFilmDetail onData = {handleData}/>
    )
  }
  else if(data === "detail"){

    return (
      <ShowDetail onData ={handleData} reqID = {id} />
    )
  } else if(data === "edit"){

    return (
      <UpdateFilm onData ={handleData} reqID = {id} />
    )
  }
  // else if(data === "edit"){

  //   return (
  //     <UpdateFilm />
  //   )
  // }

    else if(data === "read") {

  return (
    <div>
    <CRUDFilmDetail onData = {handleData} updateId ={handleId} />
    
    </div>
  )
  }
  else{
    return (
      <div>
      <CRUDFilmDetail onData = {handleData} updateId ={handleId}/>
      
      </div>
    )
  }
}

export default FilmsEdit
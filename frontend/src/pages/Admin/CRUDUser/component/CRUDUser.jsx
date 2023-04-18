import React from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'
import { useEffect , useState  } from 'react'
import { get } from '../../../../backend/users';
import { Link } from 'react-router-dom';
// import '../css/crud.css';

export const CRUDUser = (props ) => {
    const [state , setState] = useState("read");
    const [id , SetId] = useState();
    
    const sendIdToParent = (id) => {
        props.updateId(id);

    }

    const [user, setUsers] = useState([]);


    const sendDataToParent = (text) => {
        
        props.onData(text);
        

      }


    
      const handleClick = (text,id) => {
        console.log(text);
        console.log(id);
        sendIdToParent(id);
        sendDataToParent(text);
      }

      

    
    // const  LoadDetail = (id) => {
    //     console.log(id);
    //     const data = "detail";
    //     props.onData(data);
        
    //   }

    // const  LoadEdit = (id) => {
    //     const data = "edit";
    //     props.onData(data);
        
    //   }

    // const  LoadDelete = (id) => {
    //     console.log(id);
        
    //   }

    
    

      


    useEffect(() => {
      async function fetchUser() {
        const user = await get();
        setUsers(user);
        
      }
      fetchUser();
    }, []);
  
  
    return (
      <div className='container'>
      <div className='card'>
          <div className='card-title'>
              <h2>Film list</h2>
              </div>
          <div className='card-body'>
                <div>
                    <a onClick={() => sendDataToParent("write")} className='btn btn-primary'>Thêm phim</a>
                </div>
          <table className='table table-bordered'>
              <thead className='bg-dark text-white'>
                  <tr>
                      <th>Username</th>
                      <th>name</th>
                      {/* <th>description</th> */}
                      <th>email</th>
                      
                      <th>role</th>
                      {/* <th>poster</th> */}
                      
                      <th>action</th>
                  </tr>    
  
              </thead>
  
              <tbody>
                {user.map((user) => (
                  <tr key={user.id}>
                    <td>{user.userName}</td>
                    <td>{user.name}</td>
  
                    <td>{user.email}</td>
                   
                    <td>{user.role}</td>
  
                    <td>
                      <a onClick={() => handleClick("edit" ,user.id )} className='btn btn-success'>Sửa</a>
                      {/* <a onClick={() => handleClick("read" , user.id)} className='btn btn-danger'>Xóa</a> */}
                      {/* <a onClick={() => handleClick("detail" , user.id)} className='btn btn-primary'>Chi tiết</a> */}
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

  export default CRUDUser
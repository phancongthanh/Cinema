import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { useEffect, useState } from 'react';

import { getById, update } from '../../../../backend/users';
import User, { Role } from '../../../../types/User';

export const UpdateUser = (props : any) => {

  const sendDataToParent = () => {
    const data = "read";
    props.onData(data);

  }

  
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role , setRole] = useState('Member');
    



  useEffect(() => {
    async function fetchUser() {
      const user : User|null  = await getById(props.reqID);
      if(user){
      console.log(user)
      
      setUserID(user.id);
      setUsername(user.username);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);

      }
      
      
    }
    fetchUser();
  }, []);



  async function handleUpdateUser() {
    
    try {

      const userToUpdate :any  = {
        id: userID,
        username: username,
        name: name,
        email: email,
        role: role as Role ,



        };

      console.log(typeof(userToUpdate.role));
      console.log(userToUpdate);
      update(userToUpdate as User);
      const afteruser =await getById(props.reqID);
      console.log("after update", afteruser);
      console.log(typeof (afteruser?.role));
      

      sendDataToParent();
      
    } catch (error) {
      console.error('Error updating film:', error);
    }
  }


  



return (
<div>
<div className='row'>
    <div className='offset-lg-3 col-lg-6'>
        <div className='container'>
            <div className='card'>

                <div className='card-title'>
                    <h2>Thêm phim</h2>
                </div>


                <div className='card-body'>

                    <div className='row'>


                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>ID</label>
                                <input value ={userID}   type='text' className='form-control' readOnly={true}/>

                        </div>

                    </div>
                        
                    



                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Username</label>
                                <input value ={username}  onChange={e => setUsername(e.target.value)} type='text' className='form-control' />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='category'>Name</label>
                                <input value ={name} onChange={e => setName(e.target.value)}  type='text' className='form-control' />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Email</label>
                                <input value ={email} onChange={e => setEmail(e.target.value)}  type='text' className='form-control'  />

                        </div>

                    </div>
                    <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='title'>Role</label>
                                <input value ={role}  onChange={e => setRole(e.target.value)}  className='form-control'  />

                        </div>

                    </div>
                    

                    <div className='col-lg-12'>
                            <div className='form-group'>
                                
                                <button onClick={() => handleUpdateUser()}  className='btn btn-success' type='submit'>Cập Nhật</button>
                                <button onClick={() => sendDataToParent()}  className='btn btn-primary' type='submit'>Quay lại</button>

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

export default UpdateUser
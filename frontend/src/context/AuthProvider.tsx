import { createContext, FC, ReactNode, useEffect, useState } from 'react';

import identity from '../backend/identity';
import users from '../backend/users';
import { Role } from '../types/User';

const getAuth = () : Role | null => identity.check() ? identity.getRole() : null;

const AuthContext = createContext<{
  auth: Role| null;
  setAuth: React.Dispatch<React.SetStateAction<Role| null>>
}>({ auth: null, setAuth: () => {} });

type propTypes = {
  children: ReactNode;
};

export const AuthProvider: FC<propTypes> = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState<Role| null>(getAuth());
  
  useEffect(() => {
    console.log(auth || 'not')
    console.log(identity.getToken())
    if(auth) console.log(users.getById(identity.getUserId() as string))
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

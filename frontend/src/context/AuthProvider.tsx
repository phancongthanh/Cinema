import { createContext, useState, ReactNode, FC, useEffect } from "react";
import LoginModel from "../types/LoginModel";
import identity from "../backend/identity";
import users from "../backend/users";
import User from "../types/User";
import accounts from "../backend/accounts";

export type Role = 'Admin' | 'Manager' | 'Member';

const getAuth = () : Role | null => {
  // if(!identity.getToken()) return null;
  // login
  // return identity.getRole() || null;
  return 'Admin';
}

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

import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { Role } from '../types/User';

type propTypes = {
    allowedRole: Role[];
};

const RequiredAuth: FC<propTypes> = ({allowedRole})=> {
    const {auth}  = useAuth()
    const location = useLocation()
    // const navigate = useNavigate()
    
    return (
        allowedRole.some(role => role === auth) ?
         <Outlet />
                : auth
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                    : <Navigate to="/needLogin" state={{from: location}} replace/>
    )
}

export default RequiredAuth
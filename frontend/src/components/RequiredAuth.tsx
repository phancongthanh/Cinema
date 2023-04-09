import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"

import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { Role } from "../context/AuthProvider";

type propTypes = {
    allowedRole: Role;
};

const RequiredAuth: FC<propTypes> = ({allowedRole})=> {
    const {auth}  = useAuth()
    const location = useLocation()
    // const navigate = useNavigate()
    
    return (
        auth === allowedRole ?
         <Outlet />
                : auth
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                    : <Navigate to="/needLogin" state={{from: location}} replace/>
    )
}

export default RequiredAuth
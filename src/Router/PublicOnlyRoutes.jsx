
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userAuthContext } from "../contexts/UserAuthContext";

export default function PublicOnlyRoutes ({path}) {
    const { isLoggedIn } = useContext(userAuthContext)

    return (
        !isLoggedIn ? <Outlet/> : <Navigate to={path} />
    )

}
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootSt } from "../../redux/store";

const PrivateRoute: React.FC = () => {
    const token = useSelector((state: RootSt) => state.auth.token);
    return token ? <Outlet /> : <Navigate to="/sign-in" />;
  };
  
  export default PrivateRoute;
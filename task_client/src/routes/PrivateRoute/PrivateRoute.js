import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../store/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLoading, currUser } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  if (!currUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

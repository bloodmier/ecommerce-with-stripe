import { Navigate } from "react-router";

import { PropsWithChildren } from "react";

export const Privateroute = ({ children }:PropsWithChildren) => {


  if (localStorage.getItem("authToken") !== "authenticated") {
    return <Navigate to="/login" />;
  }
  return children
  
};

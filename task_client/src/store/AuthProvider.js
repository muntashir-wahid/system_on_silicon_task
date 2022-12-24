import React, { createContext, useEffect, useState } from "react";

const defaultContext = {
  currUser: {},
  createUserHandler: () => {},
  logoutHandler: () => {},
};

export const AuthContext = createContext(defaultContext);

const AuthProvider = ({ children }) => {
  // Current user
  const [currUser, setCurrUser] = useState(null);

  // Create new User
  const createUserHandler = (newUser) => {
    fetch("http://localhost:5000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCurrUser(data?.data?.user);
        }
      });
  };

  // Logout User

  const logoutHandler = () => {
    setCurrUser(null);
  };

  // Auth Value
  const authInfo = { currUser, createUserHandler, logoutHandler };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

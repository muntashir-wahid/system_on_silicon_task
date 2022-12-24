import React, { createContext, useEffect, useState } from "react";

const defaultContext = {
  currUser: {},
  createUserHandler: (newUser) => {},
  logoutHandler: () => {},
  loginHandler: (email, password) => {},
};

export const AuthContext = createContext(defaultContext);

const AuthProvider = ({ children }) => {
  // Current user
  const [currUser, setCurrUser] = useState(null);
  const [error, setError] = useState("");

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
          localStorage.setItem("userId", data?.data?.user?._id);
        }

        if (data.status === "fail") {
          setError(data.message);
        }
      });
  };

  // Login user

  const loginHandler = (email, password) => {
    fetch(`http://localhost:5000/api/v1/users?email=${email}`, {
      headers: {
        password: password,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCurrUser(data?.data?.user);
          localStorage.setItem("userId", data?.data?.user?._id);
        }
      });
  };

  console.log(error);

  // Logout User

  const logoutHandler = () => {
    setCurrUser(null);
    localStorage.removeItem("userId");
  };

  // Get Current user

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(`http://localhost:5000/api/v1/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            setCurrUser(data?.data?.user);
          }
        });
    }
  }, []);

  // Auth Value
  const authInfo = { currUser, createUserHandler, loginHandler, logoutHandler };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

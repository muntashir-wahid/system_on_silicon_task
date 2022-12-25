import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const defaultContext = {
  currUser: {},
  createUserHandler: (newUser) => {},
  logoutHandler: () => {},
  loginHandler: (email, password) => {},
  isLoading: "",
};

export const AuthContext = createContext(defaultContext);

const AuthProvider = ({ children }) => {
  // Current user
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  // Create new User
  const createUserHandler = (newUser) => {
    fetch("https://dev-profile-server.vercel.app/api/v1/users", {
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
          toast.success("Congrats!You have created an account successfully");
        }

        if (data.status === "fail") {
          toast.error(data.message);
        }
        setIsLoading(false);
      });
  };

  // Login user

  const loginHandler = (email, password) => {
    fetch(`https://dev-profile-server.vercel.app/api/v1/users?email=${email}`, {
      headers: {
        password: password,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCurrUser(data?.data?.user);
          localStorage.setItem("userId", data?.data?.user?._id);
          toast.success("Login successfull!");
        }

        if (data.status === "fail") {
          toast.error(data.message);
        }
        setIsLoading(false);
      });
  };

  // Logout User

  const logoutHandler = () => {
    setCurrUser(null);
    localStorage.removeItem("userId");
    toast.success("Logout successfull");
  };

  // Get Current user

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      setIsLoading(true);
      fetch(`https://dev-profile-server.vercel.app/api/v1/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setCurrUser(data?.data?.user);
            setIsLoading(false);
          }
        });
    }
  }, [isUpdated]);

  // Auth Value
  const authInfo = {
    currUser,
    isLoading,
    createUserHandler,
    loginHandler,
    logoutHandler,
    setIsUpdated,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

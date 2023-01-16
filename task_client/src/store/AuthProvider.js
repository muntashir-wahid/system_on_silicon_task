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
    fetch("https://dev-profile-server.vercel.app/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const { user } = data.data;
          setCurrUser(user);
          localStorage.setItem("userId", user?._id);
          toast.success(
            `Congrats ${user?.fullName}!Account created successfully`
          );
        }

        if (data.status !== "success") {
          toast.error(data.message);
        }
        setIsLoading(false);
      });
  };

  // Login user

  const loginHandler = (user) => {
    fetch("https://dev-profile-server.vercel.app/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const { user } = data?.data;
          setCurrUser(user);
          localStorage.setItem("userId", user?._id);
          toast.success("Login successfull!");
        }

        if (data.status !== "success") {
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

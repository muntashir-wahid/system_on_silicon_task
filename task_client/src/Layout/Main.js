import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";

const Main = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Main;

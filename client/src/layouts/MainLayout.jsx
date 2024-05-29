import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
        <ToastContainer />
      </main>
    </>
  );
}

export default MainLayout;

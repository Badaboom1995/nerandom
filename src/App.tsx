import React, { useEffect, useState } from "react";
import AppRouter, { NonUserRouter } from "./router";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";

Modal.setAppElement("#root");

function App() {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState("vasya");

  useEffect(() => {
    console.log("");
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      {isLoading && <div>loading...</div>}
      {user ? <AppRouter /> : <NonUserRouter />}
      <div
        className={"fixed w-full h-full bg-red-100 -z-1"}
        id={"confetiWrapper"}
      ></div>
    </div>
  );
}

export default App;

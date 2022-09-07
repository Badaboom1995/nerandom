import React, { useEffect, useState } from "react";
import AppRouter, { NonUserRouter } from "./router";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState("vasya");

  useEffect(() => {
    const wind: any = window;
    console.log(wind.Telegram?.WebApp);
  }, []);

  return (
    <div className="App">
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

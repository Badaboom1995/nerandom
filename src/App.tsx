import React, { useEffect, useState } from "react";
import AppRouter, { NonUserRouter } from "./router";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";
import "react-loading-skeleton/dist/skeleton.css";
import { dummyUrl } from "./config/consts";
import { RecoilRoot } from "recoil";
import { track, init } from "@amplitude/analytics-browser";

Modal.setAppElement("#root");
//
// const wind: any = window;
// wind.Telegram = {
//   WebApp: {
//     expand: () => {
//       console.log("expanded");
//     },
//     initDataUnsafe: {
//       user: {
//         username: "badavoo",
//         firstname: "Alex",
//         lastname: "Belov",
//         photoUrl: dummyUrl,
//       },
//     },
//   },
// };

function App() {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState("vasya");
  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      init("d19f8d3c8128a21854a86d0ca15bce38");
    }
    track("enter");
  }, []);

  return (
    <div className="App">
      <RecoilRoot>
        <ToastContainer />
        {isLoading && <div>loading...</div>}
        {user ? <AppRouter /> : <NonUserRouter />}
        <div
          className={"fixed w-full h-full bg-red-100 -z-1"}
          id={"confetiWrapper"}
        ></div>
      </RecoilRoot>
    </div>
  );
}

export default App;

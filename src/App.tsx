import React, { useEffect } from "react";
import AppRouter from "./router";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";
import "react-loading-skeleton/dist/skeleton.css";
import { track, init } from "@amplitude/analytics-browser";
import { useLoadUser } from "./recoil/user/userActions";

Modal.setAppElement("#root");

const wind: any = window;

// wind.Telegram = {
//   WebApp: {
//     expand: () => {
//       return;
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
  wind.Telegram.WebApp.expand();
  const user = useLoadUser();

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      init("d19f8d3c8128a21854a86d0ca15bce38");
    }
    track("enter");
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      {user.fulfilled && <AppRouter />}
      <div className={"fixed w-full h-full -z-1"} id={"confetiWrapper"}></div>
    </div>
  );
}

export default App;

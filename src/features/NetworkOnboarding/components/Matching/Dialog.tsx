import React from "react";
import tg from "./assets/telegram.png";

const Dialog = ({ users }: any = []) => {
  return (
    <div className={"flex flex-col"}>
      {users?.map(({ name, occupation, telegram_nickname }: any) => (
        <div className={"flex mb-5 dialog"}>
          <div className={"flex grow"}>
            <div
              className={
                "min-w-[65px] max-w-[65px] h-[65px] mr-3 rounded-full overflow-hidden"
              }
            >
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt=""
              />
            </div>
            <div className={"grow "}>
              <p className={"text-lg mb"}>{name}</p>
              <p className={"text-sm text-slate-400  overflow-scroll"}>
                {occupation ? occupation.join(", ") : "Должность неизвестна"}
              </p>
            </div>
          </div>

          <div className={"flex items-center"}>
            <button
              className={
                "p-2 px-4 rounded bg-slate-200 w-14 active:bg-slate-400 transition"
              }
              onClick={() => {
                const win: any = window;
                win.Telegram.WebApp.openTelegramLink(
                  `https://t.me/${telegram_nickname}`
                );
              }}
            >
              <img src={tg} alt="" className={"w-[20px]"} />{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dialog;

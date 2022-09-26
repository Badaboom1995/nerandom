import React from "react";
import tg from "./assets/telegram.png";

const Dialog = ({ users }: any = []) => {
  return (
    <div className={"flex flex-col"}>
      {!users.length && (
        <p className={"text-2xl font-black text-slate-300 text-center py-10"}>
          Пока никого
        </p>
      )}
      {users?.map(({ name, occupation, telegram_nickname, Avatar }: any) => (
        <div className={"flex mb-5 dialog"}>
          <div className={"flex grow"}>
            <div
              className={
                "min-w-[65px] max-w-[65px] h-[65px] mr-3 rounded-full overflow-hidden"
              }
            >
              <img src={Avatar[0].url} alt="" />
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

import React, { useState, useEffect } from "react";
import tg from "../../assets/telegram.png";
import matchesSerivce from "../../../../services/matches";
import { unwrapAirtable } from "../../../../utils/unwrap";
import { getUsersByNick } from "../../../../services/users";
import { dummyUrl } from "../../../../config/consts";
import { useRecoilState, useRecoilValue } from "recoil";
import { textState } from "./recoil/dialogs";
import { track } from "@amplitude/analytics-browser";
import userAtom from "../../../../recoil/user/userAtom";

const Dialog = () => {
  const [dialogs, setDialogs]: any = useRecoilState(textState);
  const user: any = useRecoilValue(userAtom);
  const [isLoaded, setLoaded]: any = useState(false);

  const getDialogs = () => {
    matchesSerivce
      .getMatchesByNickname(user.fields.telegram_nickname)
      .then((result) => {
        const input = unwrapAirtable(result).map((item: any) =>
          item.userOne === user.fields.telegram_nickname
            ? item.userTwo
            : item.userOne
        );
        console.log(input);
        getUsersByNick(input).then((result) => {
          setDialogs(
            unwrapAirtable(result).map((item: any) => ({
              name: item.name,
              occupation: item["ID (from occupation)"],
              telegram_nickname: item.telegram_nickname,
              Avatar: item.Avatar || [{ url: dummyUrl }],
            }))
          );
          track("finishLoadingDialogs");
          setLoaded(true);
        });
      });
  };

  useEffect(() => {
    track("startLoadingDialogs");
    getDialogs();
  }, []);

  return (
    <div className={"flex flex-col"}>
      {!isLoaded && "Загрузка..."}
      {!dialogs.length && isLoaded && (
        <p className={"text-2xl font-black text-slate-300 text-center py-10"}>
          Пока никого
        </p>
      )}
      {dialogs?.map(({ name, occupation, telegram_nickname, Avatar }: any) => (
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
              <p className={"text-sm text-orange-300"}>{telegram_nickname}</p>
            </div>
          </div>

          <div className={"flex items-center"}>
            <button
              className={
                "p-2 px-4 rounded bg-slate-200 w-14 active:bg-slate-400 transition"
              }
              onClick={() => {
                track("goToDirect");
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

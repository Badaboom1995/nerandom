import React, { useEffect, useState } from "react";
import UserCard from "../../../../components/UserCard";

import tribe from "./assets/tribe.svg";
import eye from "./assets/eye.svg";
import chat from "./assets/chat.svg";
import coffee from "./assets/coffee.svg";
import tg from "./assets/telegram.png";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getScoredPairs } from "../../../../helpers/findMatch";
import { unwrapAirtable, unwrapIdsToNames } from "../../../../helpers/unwrap";
import Stepper from "../../../../components/Stepper";

import matchesSerivce from "../../../../services/matches";
import { getUsersByNick } from "../../../../services/users";
import useImagePreloader from "../../../../hooks/useImagePreloader";

const assets = [tribe, eye, chat, coffee, tg];

const EmptyState = ({ openDialogs }: { openDialogs?: any }) => {
  return (
    <div className={"relative empty mt-5"}>
      <div
        className={
          "py-14 text-white text-center text-2xl font-black  bg-orange-500 rounded-lg relative mb-10 drop-shadow-lg"
        }
      >
        <img
          src={eye}
          alt="eye"
          className={"absolute left-1/2 -top-10 -translate-x-1/2"}
        />
        На сегодня всё,
        <br /> приходи завтра
      </div>
      <button
        onClick={() => openDialogs(0)}
        className={"underline text-center w-full"}
      >
        Перейти к диалогам
      </button>
      <img
        src={tribe}
        alt="tribe"
        className={"fixed -bottom-5 left-1/2 -translate-x-1/2 min-w-[700px]"}
      />
    </div>
  );
};

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
                {occupation?.join(", ")}
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

const Matching = ({
  dicts,
  user,
}: {
  dicts: { areas: any; skills: any; occupation: any };
  user: any;
}) => {
  //Comment on prod
  user.username = "@tcndtht";

  const [users, setUsers]: any = useState([]);
  const [isDone, setDone] = useState(false);
  const [isReady, setReady] = useState(false);
  const [myActions, setMyActions]: any = useState(null);
  const [dialogs, setDialogs]: any = useState([]);
  const [tabIndex, setTabIndex] = useState(1);

  const slides = users
    .filter((item: any) => !myActions?.includes(item.telegram_nickname))
    .map((targetUser: any) => {
      return {
        component: UserCard,
        hideDefaultControls: true,
        props: { user: targetUser, currentUser: user },
      };
    });

  const getNormalizedPairs = (rawPairs: any) => {
    return rawPairs.map((pair: any) => ({
      ...pair,
      skills: unwrapIdsToNames(pair.skills, dicts.skills),
      areas: unwrapIdsToNames(pair.areas, dicts.areas),
      occupation: unwrapIdsToNames(pair.occupation, dicts.occupation, true),
    }));
  };

  useEffect(() => {
    matchesSerivce.getMatchesByNickname(user.username).then((result) => {
      const input = unwrapAirtable(result).map((item: any) =>
        item.userOne === user.username ? item.userTwo : item.userOne
      );
      getUsersByNick(input).then((result) => {
        setDialogs(
          unwrapAirtable(result).map((item: any) => ({
            name: item.name,
            occupation: item["ID (from occupation)"],
            telegram_nickname: item.telegram_nickname,
          }))
        );
      });
    });

    matchesSerivce
      .getActionsByNickname(user.username)
      .then((results: any) => {
        setMyActions(unwrapAirtable(results).map((item: any) => item.actionTo));
      })
      .then(() => getScoredPairs(user.username))
      .then((result) => {
        setUsers(getNormalizedPairs(result));
      })
      .then(() => {
        setReady(true);
      });
  }, []);

  return (
    <div className={""}>
      <Tabs
        selectedTabClassName={"border-orange-400"}
        onSelect={(index) => setTabIndex(index)}
        selectedIndex={tabIndex}
      >
        <TabList className={"flex"}>
          <Tab className={"w-1/2 text-center p-2 border-b-2 outline-none"}>
            <div className={"flex items-center justify-center"}>
              <img className={"mr-2"} src={chat} alt="" />
              <span>Диалоги</span>
            </div>
          </Tab>
          <Tab className={"w-1/2 text-center p-2 border-b-2 outline-none"}>
            <div className={"flex items-center justify-center "}>
              <img className={"mr-2"} src={coffee} alt="" />
              <span>Мэтчинг</span>
            </div>
          </Tab>
        </TabList>
        <div className={"pt-5 pb-10"}>
          <TabPanel>
            <Dialog users={dialogs} />
          </TabPanel>
          <TabPanel>
            {isDone && <EmptyState openDialogs={setTabIndex} />}
            {!isDone && isReady && (
              <Stepper
                slides={slides || []}
                onDone={() => {
                  setDone(true);
                }}
                Empty={<EmptyState openDialogs={setTabIndex} />}
              />
            )}
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default Matching;

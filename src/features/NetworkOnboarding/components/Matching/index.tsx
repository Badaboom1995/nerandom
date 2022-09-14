import React from "react";
import UserCard from "../../../../components/UserCard";
import cross from "./assets/cross.svg";
import like from "./assets/like.svg";
import tribe from "./assets/tribe.svg";
import eye from "./assets/eye.svg";
import chat from "./assets/chat.svg";
import coffee from "./assets/coffee.svg";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const EmptyState = () => {
  return (
    <div className={"relative empty"}>
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
      <button className={"underline text-center w-full"}>
        Перейти к диалогам
      </button>
      <img
        src={tribe}
        alt="tribe"
        className={"absolute bottom-0 left-1/2 -translate-x-1/2 min-w-[700px]"}
      />
    </div>
  );
};

const Matching = () => {
  return (
    <div className={""}>
      <Tabs selectedTabClassName={"border-orange-400"}>
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
        <div className={"pt-10 h-96"}>
          <TabPanel>
            <h2>Пока пусто</h2>
          </TabPanel>
          <TabPanel>
            {/*<EmptyState />*/}
            <UserCard />
            <div className="flex w-full  z-10 relative justify-between -translate-y-1/4">
              <img src={cross} alt="" className={" -translate-x-1/4 ml-2"} />
              <img src={like} alt="" className={" translate-x-1/4 mr-2"} />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default Matching;

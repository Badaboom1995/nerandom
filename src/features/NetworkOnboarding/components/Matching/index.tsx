import React, { useState } from "react";

import chat from "../../assets/chat.svg";
import coffee from "../../assets/coffee.svg";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Dialog from "./Dialog";
import Cards from "./Cards";

const Matching = ({
  dicts,
  user,
}: {
  dicts: { areas: any; skills: any; occupation: any };
  user: any;
}) => {
  //Comment on prod
  // user.username = "@VictorSavyuk";
  const [tabIndex, setTabIndex] = useState(1);

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
            <Dialog user={user} />
          </TabPanel>
          <TabPanel>
            <Cards user={user} setTabIndex={setTabIndex} dicts={dicts} />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default Matching;

import React, { useEffect, useState } from "react";
import UserCard from "../../../../components/UserCard";

import chat from "./assets/chat.svg";
import coffee from "./assets/coffee.svg";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getScoredPairs } from "../../../../helpers/findMatch";
import { unwrapAirtable, unwrapIdsToNames } from "../../../../helpers/unwrap";
import Stepper from "../../../../components/Stepper";

import matchesSerivce from "../../../../services/matches";
import { getUsersByNick } from "../../../../services/users";
import EmptyState from "./EmptyState";
import Dialog from "./Dialog";
import { dummyUrl } from "../../../../config/consts";
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

  // const getNormalizedPairs = (rawPairs: any) => {
  //   return rawPairs.map((pair: any) => ({
  //     ...pair,
  //     Avatar: pair.Avatar || [{ url: dummyUrl }],
  //     skills: unwrapIdsToNames(pair.skills, dicts.skills),
  //     areas: unwrapIdsToNames(pair.areas, dicts.areas),
  //     occupation: unwrapIdsToNames(pair.occupation, dicts.occupation, true),
  //   }));
  // };

  useEffect(() => {
    // matchesSerivce.getMatchesByNickname(user.username).then((result) => {
    //   const input = unwrapAirtable(result).map((item: any) =>
    //     item.userOne === user.username ? item.userTwo : item.userOne
    //   );
    //   getUsersByNick(input).then((result) => {
    //     setDialogs(
    //       unwrapAirtable(result).map((item: any) => ({
    //         name: item.name,
    //         occupation: item["ID (from occupation)"],
    //         telegram_nickname: item.telegram_nickname,
    //         Avatar: item.Avatar || [{ url: dummyUrl }],
    //       }))
    //     );
    //   });
    // });
    // matchesSerivce
    //   .getActionsByNickname(user.username)
    //   .then((results: any) => {
    //     setMyActions(unwrapAirtable(results).map((item: any) => item.actionTo));
    //   })
    //   .then(() => getScoredPairs(user.username))
    //   .then((result) => {
    //     setUsers(getNormalizedPairs(result));
    //   })
    //   .then(() => {
    //     setReady(true);
    //   });
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
            <Dialog user={user} />
          </TabPanel>
          <TabPanel>
            {/*{isDone && <EmptyState openDialogs={setTabIndex} />}*/}
            {/*{!isDone && isReady && (*/}
            {/*  <Stepper*/}
            {/*    slides={*/}
            {/*      users*/}
            {/*        .filter(*/}
            {/*          (item: any) =>*/}
            {/*            !myActions?.includes(item.telegram_nickname)*/}
            {/*        )*/}
            {/*        .map((targetUser: any) => {*/}
            {/*          return {*/}
            {/*            component: UserCard,*/}
            {/*            hideDefaultControls: true,*/}
            {/*            props: {*/}
            {/*              user: targetUser,*/}
            {/*              currentUser: user,*/}
            {/*              pushToDialogs,*/}
            {/*              removeUser,*/}
            {/*            },*/}
            {/*          };*/}
            {/*        }) || []*/}
            {/*    }*/}
            {/*    onDone={() => {*/}
            {/*      setDone(true);*/}
            {/*    }}*/}
            {/*    Empty={<EmptyState openDialogs={setTabIndex} />}*/}
            {/*  />*/}
            {/*)}*/}
            <Cards user={user} setTabIndex={setTabIndex} dicts={dicts} />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default Matching;

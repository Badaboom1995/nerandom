import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Stepper from "../../../../components/Stepper";
import UserCard from "../../../../components/UserCard";
import matchesSerivce from "../../../../services/matches";
import { unwrapAirtable, unwrapIdsToNames } from "../../../../helpers/unwrap";
import { getScoredPairs } from "../../../../helpers/findMatch";
import { dummyUrl } from "../../../../config/consts";
import Skeleton from "react-loading-skeleton";
import { track } from "@amplitude/analytics-browser";
import { useRecoilState } from "recoil";
import { likesCounter } from "./store/dialogs";
import * as dayjs from "dayjs";

const day: any = dayjs;

const Cards = ({ setTabIndex, user, dicts }: any) => {
  const [users, setUsers]: any = useState([]);
  const [isDone, setDone] = useState(false);
  const [isReady, setReady] = useState(false);
  const [myActions, setMyActions]: any = useState(null);
  const [likes, setLikes]: any = useRecoilState(likesCounter);

  const removeUserFromMatching = (telegram_nickname: string) => {
    setUsers(
      users.filter((item: any) => item.telegram_nickname !== telegram_nickname)
    );
  };

  const slides = users
    .filter((item: any) => !myActions?.includes(item.telegram_nickname))
    .map((targetUser: any) => {
      return {
        component: UserCard,
        hideDefaultControls: true,
        props: {
          user: targetUser,
          currentUser: user,
        },
      };
    });

  const getNormalizedPairs = (rawPairs: any) => {
    return rawPairs.map((pair: any) => ({
      ...pair,
      Avatar: pair.Avatar || [{ url: dummyUrl }],
      skills: unwrapIdsToNames(pair.skills, dicts.skills),
      areas: unwrapIdsToNames(pair.areas, dicts.areas),
      occupation: unwrapIdsToNames(pair.occupation, dicts.occupation, true),
    }));
  };

  const getPairs = () => {
    let gotLikes = 0;
    matchesSerivce
      .getActionsByNickname(user.username)
      .then((results: any) => {
        unwrapAirtable(results)
          .filter((item: any) => item.type === "like")
          .forEach((item: any) => {
            if (
              day(item.createdTime).format("DD/MM/YYYY") ===
              day().format("DD/MM/YYYY")
            ) {
              gotLikes++;
            }
          });
        setLikes(gotLikes);
        setMyActions(unwrapAirtable(results).map((item: any) => item.actionTo));
      })
      .then(() => getScoredPairs(user.username))
      .then((result) => {
        setUsers(getNormalizedPairs(result));
      })
      .then(() => {
        setReady(true);
        track("finishLoadingCards");
      });
  };

  useEffect(() => {
    track("startLoadingCards");
    getPairs();
  }, []);

  return (
    <div>
      {isDone || (likes > 4 && <EmptyState openDialogs={setTabIndex} />)}
      {!isDone && isReady && likes < 4 ? (
        <Stepper
          slides={slides || []}
          onDone={() => {
            setDone(true);
          }}
          Empty={<EmptyState openDialogs={setTabIndex} />}
        />
      ) : (
        <div className={"border border-slate-200 rounded-lg p-2 h-full"}>
          <div className={"flex justify-center mb-3"}>
            <Skeleton
              circle
              width="75px"
              height="75px"
              containerClassName="avatar-skeleton my-0 mx-auto"
            />
          </div>
          <div
            className={
              "flex justify-center mb-3 border-b border-slate-200 pb-5"
            }
          >
            {" "}
            <Skeleton width="100px" height="30px" />
          </div>
          <Skeleton count={5} />
        </div>
      )}
    </div>
  );
};

export default Cards;

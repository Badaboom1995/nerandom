import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Stepper from "components/Stepper";
import UserCard from "components/UserCard";
import { track } from "@amplitude/analytics-browser";
import { useRecoilValue } from "recoil";
import * as dayjs from "dayjs";
import userAtom from "recoil/user/userAtom";
import { matchingCardsAtom } from "./recoil/cards";
import LoadingCard from "./components/LoadingCard";
import { useLoadBatch } from "./recoil/matchingCardsActions";
import matchesSerivce from "../../../../services/matches";
import button from "../../../../components/Button";

const day: any = dayjs;

const Cards = ({ setTabIndex }: any) => {
  const user = useRecoilValue(userAtom);
  const cardsState = useRecoilValue(matchingCardsAtom);
  const cards = useLoadBatch(user.fields.telegram_nickname);

  const slides = cards?.currentBatch.map((targetUser: any) => {
    return {
      component: UserCard,
      hideDefaultControls: true,
      props: {
        user: targetUser,
        currentUser: user,
      },
    };
  });

  useEffect(() => {
    track("startLoadingCards");
  }, []);

  // RENDER
  if (cardsState.likes < 1) return <EmptyState openDialogs={setTabIndex} />;
  if (!cardsState.currentBatch.length && cardsState.loading)
    return <LoadingCard />;
  return (
    <Stepper
      activeIndex={cards?.slidesIndex}
      slides={slides || []}
      Empty={<EmptyState openDialogs={setTabIndex} />}
    />
  );
};

export default Cards;

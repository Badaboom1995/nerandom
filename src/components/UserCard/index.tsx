import React, { useState } from "react";
import {
  Header,
  HeaderInfo,
  Avatar,
  AvatarWrapper,
  Name,
  Tags,
  TagItem,
  OccupationItem,
  Occupation,
  Description,
  Container,
} from "./styled";
import cross from "../../features/NetworkOnboarding/assets/cross.svg";
import like from "../../features/NetworkOnboarding/assets/like.svg";
import matchesSerivce from "../../services/matches";
import { toast } from "react-toastify";
import { unwrapAirtable } from "../../helpers/unwrap";
import { useSwipeable } from "react-swipeable";
import { dummyUrl } from "../../config/consts";
import { track } from "@amplitude/analytics-browser";
import { useRecoilState } from "recoil";
import { likesCounter } from "../../features/NetworkOnboarding/components/Matching/store/dialogs";

const buttonClass =
  "drop-shadow-xl active:drop-shadow-sm active:scale-90 transition-all duration-150  mx-5 mb-2 p-2 text-white text-lg uppercase font-medium mg-2 rounded-full flex items-center";

const UserCard = ({ data = {}, next }: any) => {
  const {
    name,
    occupation,
    telegram_nickname,
    skills,
    areas,
    about,
    lastname,
  } = data.user;
  data.user.Avatar = data.user.Avatar ? data.user.Avatar : [{ url: dummyUrl }];

  const currentUser = data.currentUser.username;
  const [showSuccess, setSuccess] = useState(false);
  const [showSkip, setSkip] = useState(false);
  const [likes, setLikes]: any = useRecoilState(likesCounter);

  const likeUser = () => {
    setSuccess(true);
    setTimeout(() => {
      setLikes(likes + 1);
      setSuccess(false);
      next();
    }, 100);
    matchesSerivce.createAction(currentUser, telegram_nickname, "like");

    matchesSerivce
      .checkIfMatch(telegram_nickname, currentUser)
      .then((result) => {
        if (unwrapAirtable(result)[0]) {
          matchesSerivce.create(currentUser, telegram_nickname).then(() => {
            toast("Мэтч!", { autoClose: 1000 });
          });
        }
      });
  };

  const skipUser = () => {
    setSkip(true);
    setTimeout(() => {
      setSkip(false);
      next();
    }, 100);
    matchesSerivce.createAction(currentUser, telegram_nickname, "dislike");
    next();
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      track("swipeLeft");
      skipUser();
    },
    onSwipedRight: (eventData) => {
      track("swipeRight");
      likeUser();
    },
  });

  return data.user ? (
    <Container {...handlers}>
      <Header>
        <AvatarWrapper>
          <Avatar src={data.user.Avatar[0].url} alt="" />
        </AvatarWrapper>

        <HeaderInfo>
          <Name>
            {name} {lastname}
          </Name>
          <Occupation>
            {!occupation?.length && (
              <OccupationItem>🥸 Должность неизвестна</OccupationItem>
            )}
            {occupation && <OccupationItem>{occupation[0]}</OccupationItem>}
          </Occupation>
        </HeaderInfo>
      </Header>

      <Description>{about}</Description>
      <Tags>
        {!skills?.length && !areas?.length && <TagItem>???</TagItem>}
        {skills?.map((item: any) => (
          <TagItem key={item} className={`bg-${"slate"}-400`}>
            {item}
          </TagItem>
        ))}
        {areas?.map((item: any) => (
          <TagItem key={item} className={`bg-${"slate"}-400`}>
            {item}
          </TagItem>
        ))}
      </Tags>
      <div className="flex w-full z-10 justify-between items-center fixed bottom-0 left-0">
        <div>
          <button
            className={"ml-5  bg-black " + buttonClass}
            onClick={() => {
              track("pushDislike");
              skipUser();
            }}
          >
            <img src={cross} alt="" className={"w-10 w-[70px]"} />
          </button>
        </div>

        <div className={"flex flex-col items-center"}>
          <span className={"text-lg font-bold"}>{5 - likes}</span>
          <button
            className={"mr-5 bg-[#FF7F0A] flex flex-col" + buttonClass}
            onClick={() => {
              track("pushLike");
              likeUser();
            }}
          >
            <img src={like} alt="" className={"w-10  w-[70px]"} />
          </button>
        </div>
      </div>
    </Container>
  ) : (
    <div>loading...</div>
  );
};

export default UserCard;

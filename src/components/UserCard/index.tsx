import React, { useEffect, useRef, useState } from "react";
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
import cross from "../../features/NetworkOnboarding/components/Matching/assets/cross.svg";
import like from "../../features/NetworkOnboarding/components/Matching/assets/like.svg";
import matchesSerivce from "../../services/matches";
import { toast } from "react-toastify";
import { unwrapAirtable } from "../../helpers/unwrap";
import { useSwipeable } from "react-swipeable";

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

  const currentUser = data.currentUser.username;
  const [showSuccess, setSuccess] = useState(false);
  const [showSkip, setSkip] = useState(false);
  const likeUser = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      next();
    }, 100);
    matchesSerivce.createAction(currentUser, telegram_nickname, "like");

    matchesSerivce
      .checkIfMatch(telegram_nickname, currentUser)
      .then((result) => {
        if (unwrapAirtable(result)[0]) {
          matchesSerivce.create(currentUser, telegram_nickname).then(() => {
            toast("Мэтч!");
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
    onSwipedLeft: (eventData) => skipUser(),
    onSwipedRight: (eventData) => likeUser(),
  });

  return data.user ? (
    <Container {...handlers}>
      <div
        className={`fixed top-0 -right-[30px] w-10 h-screen bg-orange-${
          showSuccess ? "100" : "0"
        } rounded transition transition-100`}
      ></div>
      <div
        className={`fixed top-0 -left-[30px] w-10 h-screen  bg-slate-${
          showSkip ? "200" : "0"
        } rounded transition transition-100`}
      ></div>
      <Header>
        <AvatarWrapper>
          <Avatar
            src={
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            }
            alt=""
          />
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
          {/*<Telegram>{telegram_nickname}</Telegram>*/}
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
      <div className="flex w-full z-10 justify-between fixed bottom-0 left-0">
        {/*<button className={"bg-black active:bg-slate-900" + buttonClass}>*/}
        {/* */}
        {/*  Дизлайк*/}
        {/*</button>*/}
        {/*<button className={" active:bg-orange-800" + buttonClass}>*/}

        {/*  Лайк*/}
        {/*</button>*/}
        <button className={"ml-5  bg-black " + buttonClass} onClick={skipUser}>
          <img src={cross} alt="" className={"w-10 w-[70px]"} />
        </button>
        <button
          className={"mr-5 bg-[#FF7F0A] " + buttonClass}
          onClick={likeUser}
        >
          <img src={like} alt="" className={"w-10  w-[70px]"} />
        </button>
      </div>
    </Container>
  ) : (
    <div>loading...</div>
  );
};

export default UserCard;

import React, { useEffect } from "react";
import {
  Header,
  HeaderInfo,
  AvatarImg,
  AvatarWrapper,
  Name,
  Tags,
  TagItem,
  OccupationItem,
  Occupation,
  Description,
  Container,
} from "./styled";
import cross from "features/Networking/assets/cross.svg";
import like from "features/Networking/assets/like.svg";
import matchesSerivce from "../../services/matches";
import { toast } from "react-toastify";
import { unwrapAirtable } from "../../utils/unwrap";
import { useSwipeable } from "react-swipeable";
import { track } from "@amplitude/analytics-browser";
import { useRecoilState } from "recoil";
import { matchingCardsAtom } from "features/Networking/components/Matching/recoil/cards";

const buttonClass =
  "drop-shadow-xl active:drop-shadow-sm active:scale-90 transition-all duration-150  mx-5 mb-2 p-2 text-white text-lg uppercase font-medium mg-2 rounded-full flex items-center";

const UserCard = ({ data = {}, next }: any) => {
  const {
    name,
    occupationsValues,
    telegram_nickname,
    skillsValues,
    areasValues,
    about,
    lastname,
    Avatar,
    chat_Id,
  } = data.user;
  const rawData = { ...data };

  const currentUser = data.currentUser.fields.telegram_nickname;
  const currentUserId = data.currentUser.fields.chat_Id;
  const [cards, setCardsState]: any = useRecoilState(matchingCardsAtom);

  const increaseSliderCounter = () => {
    setCardsState({ ...cards, slidesIndex: cards.slidesIndex + 1 });
  };

  const likeUser = () => {
    setTimeout(() => {
      next();
      increaseSliderCounter();
      setCardsState({
        ...cards,
        likes: cards.likes - 1,
      });
    }, 100);
    matchesSerivce.createAction(currentUser, telegram_nickname, "like");

    matchesSerivce
      .checkIfMatch(telegram_nickname, currentUser)
      .then((result) => {
        if (unwrapAirtable(result)[0]) {
          matchesSerivce.create(currentUser, telegram_nickname).then(() => {
            toast("Мэтч!", { autoClose: 1000 });
            // matchesSerivce.sendNotification(currentUserId, chat_Id);
          });
        }
      });
  };

  const skipUser = () => {
    setTimeout(() => {
      next();
      increaseSliderCounter();
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

  useEffect(() => {
    console.log(rawData);
  }, []);

  return (
    <Container {...handlers}>
      <Header>
        <AvatarWrapper>
          <AvatarImg src={Avatar} alt="" />
        </AvatarWrapper>

        <HeaderInfo>
          <Name>
            {name} {lastname}
          </Name>
          <Occupation>
            {!occupationsValues?.length && (
              <OccupationItem>🥸 Должность неизвестна</OccupationItem>
            )}
            {occupationsValues && (
              <OccupationItem>{occupationsValues[0]}</OccupationItem>
            )}
          </Occupation>
        </HeaderInfo>
      </Header>
      <Description>{about}</Description>
      <Tags>
        {!skillsValues?.length && !areasValues?.length && (
          <TagItem>???</TagItem>
        )}
        {skillsValues?.map((item: any) => (
          <TagItem key={item} className={`bg-${"slate"}-400`}>
            {item}
          </TagItem>
        ))}
        {areasValues?.map((item: any) => (
          <TagItem key={item} className={`bg-${"slate"}-400`}>
            {item}
          </TagItem>
        ))}
      </Tags>
      <div className="flex w-full z-1 justify-between items-center fixed bottom-0 left-0">
        <div>
          <button
            className={"ml-5 -mb-4 bg-black " + buttonClass}
            onClick={() => {
              track("pushDislike");
              skipUser();
            }}
          >
            <img src={cross} alt="" className={"w-10 w-[70px]"} />
          </button>
        </div>
        <div className={"flex flex-col items-center"}>
          <span className={"text-lg font-bold"}>{cards.likes}</span>
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
  );
};

export default UserCard;

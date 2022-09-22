import React from "react";
import {
  Header,
  HeaderInfo,
  Avatar,
  AvatarWrapper,
  Name,
  Tags,
  TagItem,
  OccupationItem,
  TagsWraper,
  Occupation,
  Telegram,
  Description,
  Container,
} from "./styled";
import cross from "../../features/NetworkOnboarding/components/Matching/assets/cross.svg";
import like from "../../features/NetworkOnboarding/components/Matching/assets/like.svg";
import matchesSerivce from "../../services/matches";
import { toast } from "react-toastify";
import { unwrapAirtable } from "../../helpers/unwrap";

const UserCard = ({ data = {}, next }: any) => {
  const { name, occupation, telegram_nickname, skills, areas, about } =
    data.user;
  const buttonClass =
    "drop-shadow-xl active:drop-shadow-sm active:scale-90 transition-all duration-150";
  const currentUser = data.currentUser.telegram_nickname;
  const likeUser = () => {
    matchesSerivce.createAction(currentUser, telegram_nickname, "like");
    matchesSerivce
      .checkIfMatch(telegram_nickname, currentUser)
      .then((result) => {
        if (unwrapAirtable(result)[0]) {
          matchesSerivce.create(currentUser, telegram_nickname).then(() => {
            toast("Мэтч!");
          });
        }
      })
      .then(() => {
        next();
      });
  };
  const skipUser = () => {
    matchesSerivce.createAction(currentUser, telegram_nickname, "dislike");
    next();
  };
  return data.user ? (
    <Container>
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
          <Name>{name}</Name>
          <Occupation>
            {!occupation?.length && (
              <OccupationItem>🥸 Должность неизвестна</OccupationItem>
            )}
            {occupation?.map((item: any) => (
              <OccupationItem key={item}>{item}</OccupationItem>
            ))}
          </Occupation>
          <Telegram>{telegram_nickname}</Telegram>
        </HeaderInfo>
      </Header>
      <Tags>
        <TagsWraper>
          {!skills?.length && !areas?.length && <TagItem>???</TagItem>}
          {skills?.map((item: any) => (
            <TagItem key={item}>{item}</TagItem>
          ))}
          {areas?.map((item: any) => (
            <TagItem key={item}>{item}</TagItem>
          ))}
        </TagsWraper>
      </Tags>
      <Description>{about}</Description>
      <div className="flex w-full z-10 justify-between translate-y-2/4 absolute bottom-0">
        <button className={"-ml-2 " + buttonClass} onClick={skipUser}>
          <img src={cross} alt="" />
        </button>
        <button className={"-mr-2 " + buttonClass} onClick={likeUser}>
          <img src={like} alt="" />
        </button>
      </div>
    </Container>
  ) : (
    <div>loading...</div>
  );
};

export default UserCard;

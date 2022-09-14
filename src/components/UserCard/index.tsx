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
  Occupation,
  Telegram,
  Description,
  Container,
} from "./styled";

// const config = [["Header", "bg-white radius-10 shadow"]];
// const [Header, HeaderInfo, Name, Occupation, Telegram, Tags, TagItem] =
//   getStyled(config);

const UserCard = () => {
  return (
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
          <Name>Хабиб Нурмагамедова</Name>
          <Occupation>
            <OccupationItem>Co-founder</OccupationItem>
            <OccupationItem>CTO</OccupationItem>
          </Occupation>
          <Telegram>@sitov</Telegram>
        </HeaderInfo>
      </Header>
      <Tags>
        <TagItem>AI</TagItem>
        <TagItem>Mental health</TagItem>
        <TagItem>Social impact</TagItem>
      </Tags>
      <Description>
        Привет! Меня зовут Паша, я основатель сообщества hegai, со основатель
        студии виртуальной реальности LikeVR и стартапа Romantic AI
      </Description>
    </Container>
  );
};

export default UserCard;

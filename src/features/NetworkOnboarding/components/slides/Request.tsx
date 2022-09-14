import CheckboxGroup from "../../../../components/ChooseGroup";
import React from "react";
import { Title } from "../../components";
const BigTitle = ({ children }: any) => {
  return <h2 className={"text-lg"}>{children}</h2>;
};
const Request = ({ data }: any) => {
  const target = [
    { content: "Познакомиться с новыми людьми", value: "meet" },
    { content: "Найти друзей", value: "friends" },
    { content: "Найти партнера", value: "partner" },
    { content: "Найти инвестора", value: "invest" },
    { content: "Найти ментора", value: "mentor" },
  ];
  return (
    <div>
      <Title> (3/4) Сформируй запрос 🎯</Title>
      <CheckboxGroup
        groupName={"goals"}
        label={<BigTitle>Цель нетворкинга?</BigTitle>}
        options={target}
      />
      <CheckboxGroup
        groupName={"requestSkills"}
        label={<BigTitle>На какие темы интересно пообщаться?</BigTitle>}
        options={data.skills}
        maxItems={10}
      />
      <CheckboxGroup
        groupName={"requestAreas"}
        label={<BigTitle>Какие области релевантны?</BigTitle>}
        options={data.areas}
        maxItems={10}
      />
      {/*<CheckboxGroup*/}
      {/*  groupName={"areas"}*/}
      {/*  label={<BigTitle>Какие темы точно не интересны?</BigTitle>}*/}
      {/*  options={areas}*/}
      {/*/>*/}
    </div>
  );
};

export default Request;

// import CheckboxGroup from "";
import CheckboxGroup from "components/ChooseGroup";
import React, { useEffect } from "react";
import { Title, BigTitle } from "../components";

import amplitude, { track } from "@amplitude/analytics-browser";

const Request = ({ data }: any) => {
  const target = [
    { content: "Познакомиться с новыми людьми", value: "meet" },
    { content: "Найти друзей", value: "friends" },
    { content: "Найти партнера", value: "partner" },
    { content: "Найти инвестора", value: "invest" },
    { content: "Найти ментора", value: "mentor" },
  ];

  useEffect(() => {
    track("onboarding-third_slide");
  }, []);

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
      />
      <CheckboxGroup
        groupName={"requestAreas"}
        label={<BigTitle>Какие области релевантны?</BigTitle>}
        options={data.areas}
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

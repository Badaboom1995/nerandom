import CheckboxGroup from "components/ChooseGroup";
import React, { useEffect } from "react";
import { Title, BigTitle } from "../components";
import { track } from "@amplitude/analytics-browser";

const AboutTwo = ({ data }: any) => {
  useEffect(() => {
    track("onboarding-first_slide");
  }, [data.areas]);

  return (
    <div>
      <Title>(2/4) Расскажи немного о себе ⭐️</Title>

      <CheckboxGroup
        className="col-span-12"
        groupName={"occupation"}
        label={<BigTitle>Должность</BigTitle>}
        options={data.occupation}
        maxItems={8}
      />
      <CheckboxGroup
        groupName={"skills"}
        label={<BigTitle>Чем можешь быть полезен?</BigTitle>}
        options={data.skills}
      />
      <CheckboxGroup
        groupName={"areas"}
        label={<BigTitle>В каких отраслях есть опыт?</BigTitle>}
        options={data.areas}
      />
      {/*<CheckboxGroup*/}
      {/*  groupName={"hobby"}*/}
      {/*  label={"- Чем занимаешься в свободное время?"}*/}
      {/*  options={areas}*/}
      {/*/>*/}
    </div>
  );
};

export default AboutTwo;

import CheckboxGroup from "../../../components/ChooseGroup";
import React from "react";
import { Title } from "../components";

const BigTitle = ({ children }: any) => {
  return <h2 className={"font-lg"}>{children}</h2>;
};

const AboutTwo = ({ data }: any) => {
  return (
    <div>
      <Title>(2/3) Расскажи немного о себе ⭐️</Title>
      <CheckboxGroup
        groupName={"skills"}
        label={<BigTitle>- Чем можешь быть полезен?</BigTitle>}
        options={data.skills}
        maxItems={8}
      />
      <CheckboxGroup
        groupName={"areas"}
        label={<BigTitle>- В каких отраслях есть опыт?</BigTitle>}
        options={data.areas}
        maxItems={8}
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

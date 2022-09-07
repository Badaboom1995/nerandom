import Input from "../../../components/Input";
import CheckboxGroup from "../../../components/ChooseGroup";
import React from "react";
import { Title } from "../components";

const AboutOne = ({ data }: any) => {
  return (
    <div>
      <Title>(1/4) Расскажи немного о себе ⭐️</Title>
      <div className="grid grid-cols-12 gap-2 mb-2">
        <Input name="name" label="Имя" className="col-span-6" />
        <Input name="lastName" label="Фамилия" className="col-span-6" />
        <Input
          name="about"
          textarea
          placeholder={
            "Привет! Меня зовут Паша, я основатель сообщества hegai, со основатель студии виртуальной реальности LikeVR и стартапа Romantic AI\n"
          }
          label="О себе"
          className="col-span-12"
        />
        <Input name="city" label="Город" className="col-span-8" />
        <CheckboxGroup
          className="col-span-4"
          groupName={"gender"}
          label={"Пол"}
          noVerticalMargins
          radio
          options={[
            { value: "male", content: "М" },
            { value: "female", content: "Ж" },
          ]}
        />
        <CheckboxGroup
          className="col-span-12"
          groupName={"occupation"}
          label={"Должность"}
          options={data.occupation}
          maxItems={5}
        />
      </div>
    </div>
  );
};

export default AboutOne;

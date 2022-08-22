import React from "react";
import Button from "../../components/Button";
import MainTitle from "../../components/typography";
import { childFlexScreen } from "../../config/mixClasses";
import CheckboxGroup from "../../components/CheckboxGroup";
import { findAllByDisplayValue } from "@testing-library/react";

const Text = ({ children }: any) => {
  return <p className={"text-lg font-normal mb-5"}>{children}</p>;
};
const Title = ({ children }: any) => (
  <MainTitle className={"border-b  mb-10 pb-10"}>{children}</MainTitle>
);

const Slide1 = ({ next, prev }: any) => {
  return (
    <div className={childFlexScreen}>
      <div className="text-center max-w-md grow">
        <MainTitle>
          Привет! Это новый раздел{" "}
          <span className="text-orange-500">NeRandomCoffee</span>
        </MainTitle>
        <Text className={"text-lg mb-10"}>
          Заполни анкету и наши умные алгоритмы подберут для тебя идеальный
          метч!
        </Text>
        <Text className={"text-lg"}>
          Нажми <b>“Готов”</b> чтобы твоя анкета появилась в базе и мы подберем
          тебе собеседника
        </Text>
      </div>
      <Button className="my-10" onClick={next}>
        Готов
      </Button>
    </div>
  );
};

const Slide2 = () => {
  const tags = [
    { content: "🤖 AI", value: "ai" },
    { content: "🧘‍♂️ Mental health", value: "mentalHealth" },
    { content: "♥️ Social impact", value: "socialImpact" },
    { content: "🤖 AI", value: "ai1" },
    { content: "🧘‍♂️ Mental health", value: "mentalHealth1" },
    { content: "♥️️ Social impact", value: "socialImpact1" },
  ];
  const listTitle = "mb-2 block text-lg";
  const listItem = "mb-10";
  return (
    <div>
      <Title>Отлично! Давай уточним твой запрос 🎯</Title>
      <ul className="">
        <li className={listItem}>
          <span className={listTitle}>- Твои компетенции</span>
          <CheckboxGroup groupName={"request-tags"} options={tags} />
        </li>
        <li className={listItem}>
          <span className={listTitle}>
            - На какие темы интересно пообщаться?
          </span>
          <CheckboxGroup groupName={"response-tags"} options={tags} />
        </li>
      </ul>
    </div>
  );
};

const Slide3 = () => {
  const titleStyle = "text-lg font-medium mb-2";
  const cardStyle = "w-80 px-2";
  const textStyle = "text-sm";

  const options = [
    {
      content: (
        <div className={cardStyle}>
          <h2 className={titleStyle}>Рандом по интересам</h2>
          <p className={textStyle}>
            Каждую неделю мы будем присылать тебе анкету по актуальным тегам
          </p>
        </div>
      ),
      value: "1",
    },

    {
      content: (
        <div className={cardStyle}>
          <h2 className={titleStyle}>Моментальный подбор</h2>
          <p className={textStyle}>Получи релевантную анкету прямо сейчас!</p>
        </div>
      ),
      value: "2",
    },
  ];

  return (
    <div>
      <MainTitle>Осталось выбрать формат и готово 👌</MainTitle>
      <CheckboxGroup groupName={"format"} options={options} />
    </div>
  );
};
const Slide4 = () => {
  const tags = [
    { content: "🤖 AI", value: "ai" },
    { content: "🧘‍♂️ Mental health", value: "mentalHealth" },
    { content: "♥️ Social impact", value: "socialImpact" },
  ];
  return (
    <div>
      <MainTitle>
        Отлично мы добавили твою анкету! Скоро здесь появится твой первый метч{" "}
      </MainTitle>
    </div>
  );
};

export { Slide1, Slide2, Slide3, Slide4 };

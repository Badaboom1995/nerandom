import { childFlexScreen } from "../../../config/mixClasses";
import MainTitle from "../../../components/typography";
import Button from "../../../components/Button";
import React from "react";
import confetti from "canvas-confetti";

const Text = ({ children }: any) => {
  return <p className={"text-lg font-normal mb-5"}>{children}</p>;
};
const Title = ({ children }: any) => (
  <MainTitle className={"border-b  mb-10 pb-10"}>{children}</MainTitle>
);

const Hello = ({ next, prev, user }: any) => {
  return (
    <div className={childFlexScreen}>
      <div className="text-center max-w-md grow">
        <MainTitle>
          Привет {user?.first_name}! Это новый раздел{" "}
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

export default Hello;

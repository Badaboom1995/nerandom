import { childFlexScreen } from "../../../../config/mixClasses";
import MainTitle from "../../../../components/typography";
import Button from "../../../../components/Button";
import React from "react";

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
        <Text className={"text-lg"}>
          Заполни анкету и мы подберем интересных людей для общения по твоему
          запросу
        </Text>
      </div>
      <Button className="my-10" onClick={next}>
        Начать
      </Button>
    </div>
  );
};

export default Hello;

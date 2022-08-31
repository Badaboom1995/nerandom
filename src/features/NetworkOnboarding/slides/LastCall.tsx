import React, { useEffect } from "react";

import Button from "../../../components/Button";
import { Title } from "../components";
import MainTitle from "../../../components/typography";
import Input from "../../../components/Input";
import ChooseGroup from "../../../components/ChooseGroup";

const Section = ({ children }: any) => (
  <div className={"col-span-12"}>{children}</div>
);
const Items = ({ children }: any) => (
  <div className={"flex flex-wrap"}>{children}</div>
);
const Item = ({ children }: any) => (
  <div className={"mr-1 mb-1 bg-gray-100 text-black p-1 px-2 rounded"}>
    {children}
  </div>
);

const LastCall = ({ next, prev, data }: any) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={"flex flex-col grow"}>
      <Title className={"my-10 text-center text-orange-500"}>Все верно?</Title>
      <div className={"flex flex-col items-center text-left grow"}>
        <div className={"text-left w-full grid grid-cols-12 gap-2 mb-2"}>
          <Input className={"col-span-6"} name={"name"} label={""} />
          <Input className={"col-span-6"} name={"surname"} label={""} />
          <Input className={"col-span-12"} name={"about"} label={""} textarea />
          <Section>
            <MainTitle className={"mb-2"}>Skills</MainTitle>
            <Items>
              {data.skills?.map((item: any) => (
                <Item>{item}</Item>
              ))}
            </Items>
          </Section>
          <Section>
            <MainTitle className={"mb-2"}>Areas</MainTitle>
            <Items>
              {data.hobby?.map((item: any) => (
                <Item>{item}</Item>
              ))}
            </Items>
          </Section>
          <Section>
            <MainTitle className={"mb-2"}>Hobby</MainTitle>
            <Items>
              {data.skills?.map((item: any) => (
                <Item>{item}</Item>
              ))}
            </Items>
          </Section>
        </div>
      </div>
      <div className={"text-center"}>
        <Button
          type={"submit"}
          className={"mb-3"}
          onClick={() => {
            console.log(data);
            next();
          }}
        >
          Все верно
        </Button>
        <button
          className={"text-sm underline"}
          type="button"
          onClick={() => {
            prev();
          }}
        >
          Исправить
        </button>
      </div>
    </div>
  );
};

export default LastCall;

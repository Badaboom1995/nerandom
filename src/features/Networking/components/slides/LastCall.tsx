import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { Title } from "../../components";
import Input from "../../../../components/Input";
import ChooseGroup from "../../../../components/ChooseGroup";
import makeRequest from "../../../../utils/makeRequest";
import { toast } from "react-toastify";
import { getUserByTGNick } from "../../../../services/users";
import { track } from "@amplitude/analytics-browser";

// todo move to formik submit level
const LastCall = ({ next, prev, data }: any) => {
  useEffect(() => {
    track("onboarding-overview_slide");
  }, []);

  const idsToObjects = (name: any) =>
    data?.values[name]?.map((item: any) => {
      const curr = data?.dicts[name]?.find(
        (dictItem: any) => dictItem.id === item
      );
      return { content: curr.name, value: curr.id };
    });
  const [isLoading, setLoading] = useState(false);
  const [acceptExternal, setExternal] = useState(true);
  const filteredAreas = idsToObjects("areas");
  const filteredSkills = idsToObjects("skills");
  const filteredOcupations = idsToObjects("occupation");

  const sendData = () => {
    const wind: any = window;
    const telegramData = wind.Telegram?.WebApp;
    const user = telegramData?.initDataUnsafe.user;
    setLoading(true);
    getUserByTGNick(user.username).then((res) => {
      const url = data.values.photoUrl;
      delete data.values.photoUrl;
      makeRequest
        .patch("Users", {
          records: [
            {
              id: res.id,
              fields: {
                ...data.values,
                Avatar: [{ url }],
                readyForExternal: acceptExternal ? "yes" : "no",
                finishedOnboardings: ["networking"],
                chat_Id: res.chat_Id,
              },
            },
          ],
        })
        .then(() => {
          next();
        })
        .catch((e) => {
          toast.error(e.response.statusText);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div className={"flex flex-col grow"}>
      <Title className={"my-10 text-center text-orange-500"}>
        (4/4) ?????? ??????????? ????
      </Title>
      <div className={"flex flex-col items-center text-left grow"}>
        <div className={"text-left w-full grid grid-cols-12 gap-2 mb-10"}>
          <Input className={"col-span-6"} name={"name"} label={""} />
          <Input className={"col-span-6"} name={"lastName"} label={""} />
          <Input className={"col-span-12"} name={"about"} label={""} textarea />
          <Input name="city" label="??????????" className="col-span-8" />
          <ChooseGroup
            groupName={"skills"}
            options={filteredSkills}
            label={"Skills"}
            className={"col-span-12"}
          />
          <ChooseGroup
            groupName={"areas"}
            options={filteredAreas}
            label={"Areas"}
            className={"col-span-12"}
          />
          <ChooseGroup
            groupName={"occupation"}
            options={filteredOcupations}
            label={"Occupation"}
            className={"col-span-12"}
          />

          {/*<Section>*/}
          {/*  <MainTitle className={"mb-2"}>Hobby</MainTitle>*/}
          {/*  <Items>*/}
          {/*    {data.skills?.map((item: any) => (*/}
          {/*      <Item>{item}</Item>*/}
          {/*    ))}*/}
          {/*  </Items>*/}
          {/*</Section>*/}
        </div>
      </div>
      <div className={"text-center"}>
        <Button
          loading={isLoading}
          type={"submit"}
          className={"mb-3"}
          onClick={() => {
            sendData();
          }}
        >
          ?????????????? ????????????
        </Button>
        <label htmlFor="" className={"block pt-2 pb-5"}>
          <input
            type="checkbox"
            checked={acceptExternal}
            onChange={() => {
              setExternal(!acceptExternal);
            }}
          />{" "}
          ?????????? ?????????????????? ?? ???????????????? ??????????????????????
        </label>
        <button
          className={"text-sm underline"}
          type="button"
          onClick={() => {
            prev();
          }}
        >
          ??????????????????
        </button>
      </div>
    </div>
  );
};

export default LastCall;

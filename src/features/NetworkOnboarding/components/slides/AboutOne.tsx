import Input from "../../../../components/Input";
import CheckboxGroup from "../../../../components/ChooseGroup";
import React, { useState } from "react";
import { Title } from "../../components";
import * as filestack from "filestack-js";
import uploadImg from "../../assets/upload.png";
import { useField } from "formik";

const AboutOne = ({ data }: any) => {
  const [photo, setPhoto] = useState("");
  const [field, meta, helpers] = useField("photoUrl");

  const client = filestack.init("AFhZiYsO5RvyyJNHgDIq4z");
  const options = {
    onFileUploadFinished: (res: any) => {
      setPhoto(res.url);
      helpers.setValue(res.url);
    },
  };

  return (
    <div>
      <Title>(1/4) Расскажи немного о себе ⭐️</Title>
      <div className="grid grid-cols-12 gap-2 mb-2">
        <Input name="name" label="Имя" className="col-span-6" />
        <Input name="lastName" label="Фамилия" className="col-span-6" />
        <Input
          name="telegram_nickname"
          placeholder={"@yournickname"}
          label="Телеграм"
          className="col-span-12"
        />
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
        {!photo && (
          <button
            onClick={() => {
              client.picker(options).open();
            }}
            className="w-[100px] p-5 mt-5 text-md bg-neutral-100 border-[1px] rounded-lg border-slate-200 flex flex-col items-center"
          >
            <img src={uploadImg} alt="" className={"w-[30px] h-[30px] mb-2"} />{" "}
            <span>Фото</span>
          </button>
        )}
        {photo && (
          <button
            className={"col-span-12"}
            onClick={() => {
              client.picker(options).open();
            }}
          >
            <img
              src={photo}
              className={"w-[150px] rounded-lg border-[1px] border-slate-200"}
              alt=""
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutOne;

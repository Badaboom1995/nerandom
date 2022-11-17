import React from "react";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import Input from "../Input";
import { BigTitle } from "../../features/NetworkingOnboarding/components";
import CheckboxGroup from "../ChooseGroup";
import { useRecoilState } from "recoil";
import dictsState from "../../recoil/dicts/dictsAtom";
import userAtom from "../../recoil/user/userAtom";

const Wrapper = ({ children }: any) => (
  <div className="fixed top-0 w-full flex justify-between p-3 text-black bg-slate-200 items-center z-100">
    {children}
  </div>
);

type LogoType = { logoUrl: string; spaceName: string; spacePage: string };
const Logo = ({ logoUrl, spaceName, spacePage }: LogoType) => (
  <div>
    {logoUrl ? (
      <img src={logoUrl} alt="" />
    ) : (
      <div>
        <span className="">{spaceName}</span>
        {"."}
        <span className="">{spacePage}</span>
      </div>
    )}
  </div>
);

const getChooseData = (item: any) => {
  return item?.map((item: any) => ({
    content: item.name,
    value: item.id,
  }));
};

const MainHeader = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [dicts, setDicts] = useRecoilState(dictsState);
  const { skills, areas, occupation } = dicts;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const win: any = window;
  const { firstname, lastname } = win.Telegram.WebApp.initDataUnsafe.user;
  return (
    <Wrapper>
      {console.log(user.fields)}
      <Logo logoUrl={""} spaceName={"Hegai"} spacePage={"Hub"} />
      <button className="font-normal" onClick={() => setIsOpen(true)}>
        {firstname} {lastname.split()[0]}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        contentLabel="Example Modal"
      >
        <Formik
          onSubmit={() => {
            return;
          }}
          initialValues={{
            name: user.fields.name,
            lastName: user.fields.lastName,
            telegram_nickname: user.fields.telegram_nickname,
            about: user.fields.about,
            areas: user.fields.areas,
            skills: user.fields.skills,
            occupation: user.fields.occupation,
          }}
        >
          <Form>
            <Input name={"name"} label={"Имя"} />
            <Input
              name={"lastName"}
              label={"Фамилия"}
              value={user.fields.lastName}
            />
            <Input
              name={"telegram_nickname"}
              label={"Ник в телеграме"}
              value={user.fields.telegram_nickname}
            />
            <Input
              name="about"
              textarea
              placeholder={
                "Привет! Меня зовут Паша, я основатель сообщества hegai, со основатель студии виртуальной реальности LikeVR и стартапа Romantic AI\n"
              }
              label="О себе"
              className="col-span-12"
              value={user.fields.about}
            />
            <CheckboxGroup
              className="col-span-12"
              groupName={"skills"}
              label={<BigTitle>Навыки</BigTitle>}
              options={getChooseData(skills)}
              maxItems={8}
            />
            <CheckboxGroup
              className="col-span-12"
              groupName={"areas"}
              label={<BigTitle>Области</BigTitle>}
              options={getChooseData(areas)}
              maxItems={8}
            />
            <CheckboxGroup
              className="col-span-12"
              groupName={"occupation"}
              label={<BigTitle>Должность</BigTitle>}
              options={getChooseData(occupation)}
              maxItems={8}
            />
          </Form>
        </Formik>
      </Modal>
    </Wrapper>
  );
};

export default MainHeader;

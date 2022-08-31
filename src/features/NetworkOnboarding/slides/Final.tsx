import MainTitle from "../../../components/typography";
import React from "react";
import cup from "../../../assets/cup.svg";
import asian from "../../../assets/asian.svg";
import Button from "../../../components/Button";
import confetti from "canvas-confetti";

const Final = ({ next, prev }: any) => {
  const myCanvas = document.createElement("canvas");
  const wrapper = document.querySelector("#confetiWrapper");
  wrapper?.appendChild(myCanvas);

  confetti({
    particleCount: 200,
    spread: 100,

    origin: { y: 0.4 },
  });
  return (
    <div>
      <MainTitle className={"my-10 text-center text-orange-500"}>
        Анекта создана!
      </MainTitle>
      <div className={"flex flex-col items-center text-center"}>
        <img className={"w-20 mb-10"} src={cup} alt="" />
        <p className={"mb-5 text-md font-medium w-full"}>
          Скоро мы подберем для тебя собеседника и пришлем его анкету.
        </p>
        <p className={"mb-5 text-md font-medium w-full"}>
          Оповещение будет в боте. Не пропусти
        </p>
        <p
          className={
            "relative p-8 pl-20 text-md font-medium bg-slate-200 mb-10 rounded-lg"
          }
        >
          <img src={asian} alt="" className={"absolute left-1 top-3 w-20"} />
          Но если совсем не терпится можем найти кого-нибудь прямо сейчас :)
        </p>
        <Button type={"submit"} className={"mb-3"}>
          Искать сейчас
        </Button>
        <button className={"text-sm underline"}>Пропустить</button>
      </div>
    </div>
  );
};

export default Final;

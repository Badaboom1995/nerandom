import MainTitle from "../../../../components/typography";
import React, { useEffect } from "react";
import cup from "../../../../assets/cup.svg";
import confetti from "canvas-confetti";
import Button from "../../../../components/Button";
import { Link } from "react-router-dom";

const Final = ({ next, prev }: any) => {
  const myCanvas = document.createElement("canvas");
  const wrapper = document.querySelector("#confetiWrapper");
  wrapper?.appendChild(myCanvas);

  useEffect(() => {
    localStorage.setItem("isOnboardingDone", "true");
    if (localStorage.getItem("hegai_dataSended") !== "yes") {
      confetti({
        particleCount: 200,
        spread: 100,

        origin: { y: 0.4 },
      });
    }
    localStorage.setItem("hegai_dataSended", "yes");
  }, []);

  return (
    <div>
      <MainTitle className={"my-10 text-center text-orange-500"}>
        Анекта создана!
      </MainTitle>
      <div className={"flex flex-col items-center text-center"}>
        <img className={"w-20 mb-10"} src={cup} alt="" />
        <p className={"mb-5 text-md font-medium w-full"}>
          Когда наберем достаточно участников сразу пришлем уведомление в бот
        </p>
        {/*<p className={"mb-5 text-md font-medium w-full"}>*/}
        {/*  Оповещение придет бота @hegai.hub в следующий вторник.*/}
        {/*</p>*/}
        <p
          className={
            "relative p-8  text-md font-medium bg-slate-200 mb-10 rounded-lg"
          }
        >
          Будет тиндер формат с очень классными ребятами, не пропусти :)
        </p>
        <Button type={"submit"} className={"mb-3"}>
          <Link
            to={"/networking"}
            onClick={() => {
              const wind: any = window;
              if (wind.Telegram?.WebApp.close) {
                wind.Telegram?.WebApp.close();
              }
            }}
          >
            Завершить
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Final;

import MainTitle from "../../../../components/typography";
import React, { useEffect } from "react";
import cup from "../../../../assets/cup.svg";
import confetti from "canvas-confetti";
import Button from "../../../../components/Button";
import { Link } from "react-router-dom";
import { track } from "@amplitude/analytics-browser";

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
    track("onboarding-finish_slide");
    localStorage.setItem("hegai_dataSended", "yes");
  }, []);
  return (
    <div>
      <MainTitle className={"my-10 text-center text-orange-500"}>
        Анкета создана!
      </MainTitle>
      <div className={"flex flex-col items-center text-center"}>
        <img className={"w-20 mb-10"} src={cup} alt="" />
        <p className={"mb-5 text-md font-medium w-full"}>
          Мы уже подобрали для тебя несколько интересных собеседников. Желаем
          приятного нетворкинга 🤓
        </p>
        <p
          className={
            "relative p-8  text-md font-medium bg-slate-200 mb-10 rounded-lg"
          }
        >
          Если что-то в приложении пойдет не так, будет неудобно или непонятно -
          пиши{" "}
          <button
            onClick={() => {
              const win: any = window;
              win.Telegram.WebApp.openTelegramLink(`https://t.me/@badavoo`);
            }}
            className={"text-blue-400"}
          >
            @badavoo
          </button>
        </p>
        <Button
          type={"submit"}
          className={"mb-3"}
          onClick={() => {
            window.location.reload();
          }}
        >
          <Link to={"/networking"}>Завершить</Link>
        </Button>
      </div>
    </div>
  );
};

export default Final;

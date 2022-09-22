import React, { useEffect, useState } from "react";
import loader_hug from "./loaderHug.gif";
import "./style.css";

const Loader = () => {
  const [count, setCount] = useState(0);
  const signs = [
    "Ищем матчи",
    "Опрашиваем друзей",
    "Вычисляем",
    "Гадаем на таро",
    "Рисуем иконки",
    "Нетворкаем",
  ];
  useEffect(() => {
    setTimeout(() => {
      if (signs[count + 1]) {
        setCount(count + 1);
      } else {
        setCount(0);
      }
    }, 800);
  }, [count]);

  return (
    <div className={"w-full h-full absolute"}>
      <div
        className={
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4 w-[50%] text-center"
        }
      >
        <img src={loader_hug} alt="loader" />
        <p className={"blink"}>{signs[count]}...</p>
      </div>
    </div>
  );
};

export default Loader;

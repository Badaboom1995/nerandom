import React from "react";
import eye from "./assets/eye.svg";
import tribe from "./assets/tribe.svg";

const EmptyState = ({
  openDialogs,
  assets,
}: {
  openDialogs?: any;
  assets: string[];
}) => {
  return (
    <div className={"relative empty mt-5"}>
      <div
        className={
          "py-14 text-white text-center text-2xl font-black  bg-orange-500 rounded-lg relative mb-10 drop-shadow-lg"
        }
      >
        <img
          src={eye}
          alt="eye"
          className={"absolute left-1/2 -top-10 -translate-x-1/2"}
        />
        На сегодня всё,
        <br /> приходи завтра
      </div>
      <button
        onClick={() => openDialogs(0)}
        className={"underline text-center w-full"}
      >
        Перейти к диалогам
      </button>
      <img
        src={tribe}
        alt="tribe"
        className={"fixed -bottom-5 left-1/2 -translate-x-1/2 min-w-[700px]"}
      />
    </div>
  );
};

export default EmptyState;

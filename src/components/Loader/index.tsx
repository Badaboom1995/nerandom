import React from "react";
import loader_gif from "./loader.gif";

const Loader = () => {
  return (
    <div className={"w-full h-full absolute"}>
      <img
        src={loader_gif}
        alt="loader"
        className={
          "absolute left-1/2 top-1/2 -translate-x-14 -translate-y-3/4 w-20"
        }
      />
    </div>
  );
};

export default Loader;

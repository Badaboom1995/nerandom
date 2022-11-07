import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingCard = () => {
  return (
    <div className={"border border-slate-200 rounded-lg p-2 h-full"}>
      <div className={"flex justify-center mb-3"}>
        <Skeleton
          circle
          width="75px"
          height="75px"
          containerClassName="avatar-skeleton my-0 mx-auto"
        />
      </div>
      <div
        className={"flex justify-center mb-3 border-b border-slate-200 pb-5"}
      >
        {" "}
        <Skeleton width="100px" height="30px" />
      </div>
      <Skeleton count={5} />
    </div>
  );
};

export default LoadingCard;

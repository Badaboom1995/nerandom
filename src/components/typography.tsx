import React from "react";

const MainTitle = ({ children, className }: any) => {
  return (
    <h1 className={`text-2xl font-medium mb-20 ${className}`}>{children}</h1>
  );
};

export default MainTitle;

import MainTitle from "../../components/typography";
import React from "react";

const Text = ({ children }: any) => {
  return <p className={"text-lg font-normal mb-5"}>{children}</p>;
};
const Title = ({ children }: any) => (
  <MainTitle className={"border-b  mb-10 pb-10"}>{children}</MainTitle>
);

export { Text, Title };

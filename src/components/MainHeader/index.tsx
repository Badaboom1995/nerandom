import React from "react";

const Wrapper = ({ children }: any) => (
  <div className="flex justify-between p-3 text-black border-b-1 border-indigo-500 font-bold items-center">
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
        <span className="text-lg text-black">{spaceName}</span>
        {"."}
        <span className="text-lg text-[#C13EFF]">{spacePage}</span>
      </div>
    )}
  </div>
);

const MainHeader = () => {
  return (
    <Wrapper>
      <Logo logoUrl={""} spaceName={"Hegai"} spacePage={"People"} />
      <div className="font-normal">Иван И.</div>
    </Wrapper>
  );
};

export default MainHeader;

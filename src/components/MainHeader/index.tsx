import React from "react";

const Wrapper = ({ children }: any) => (
  <div className="flex justify-between p-3 text-black border-b-1 border-indigo-500 items-center bg-slate-200">
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
        <span className="">{spaceName}</span>
        {"."}
        <span className="">{spacePage}</span>
      </div>
    )}
  </div>
);

const MainHeader = () => {
  const win: any = window;
  const { firstname, lastname } = win.Telegram.WebApp.initDataUnsafe.user;
  return (
    <Wrapper>
      <Logo logoUrl={""} spaceName={"Hegai"} spacePage={"People"} />
      <div className="font-normal">
        {firstname} {lastname.split()[0]}
      </div>
    </Wrapper>
  );
};

export default MainHeader;

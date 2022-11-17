import React, { FC } from "react";
import { childFlexScreen } from "../config/mixClasses";

type Props = { children: React.ReactNode };

const HeaderArea = ({ children }: Props) => {
  return <div className="grow-0 fixed bottom-0 left-0 w-full">{children}</div>;
};
const MainArea = ({ children }: Props) => {
  return (
    <div className={`${childFlexScreen} px-5 py-7 pt-16  `}>{children}</div>
  );
};
const NavArea = ({ children }: Props) => {
  return <div className="grow-0">{children}</div>;
};

type LayoutProps = {
  Header: React.FC;
  Nav: React.FC;
  children?: React.ReactNode;
};

const MainLayout = ({ Header, Nav, children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderArea>
        <Header />
      </HeaderArea>
      <MainArea>{children}</MainArea>

      {/*<NavArea>*/}
      {/*  <Nav />*/}
      {/*</NavArea>*/}
    </div>
  );
};

export default MainLayout;

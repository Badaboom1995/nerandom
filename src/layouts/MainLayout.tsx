import React, { FC } from "react";
import { childFlexScreen } from "../config/mixClasses";

type Props = { children: React.ReactNode };

const HeaderArea = ({ children }: Props) => {
  return <div className="grow-0 fixed bottom-0 left-0 w-full">{children}</div>;
};
const MainArea = ({ children }: Props) => {
  return <div className={`${childFlexScreen} px-5 py-7`}>{children}</div>;
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
      <MainArea>{children}</MainArea>
      {/*<HeaderArea>*/}
      {/*  <Header />*/}
      {/*</HeaderArea>*/}
      {/*<NavArea>*/}
      {/*  <Nav />*/}
      {/*</NavArea>*/}
    </div>
  );
};

export default MainLayout;

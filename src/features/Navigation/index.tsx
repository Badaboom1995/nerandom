import React from "react";
import { NavLink } from "react-router-dom";
import coffee from "./assets/coffee.svg";
import calendar from "./assets/calendar.svg";
import people from "./assets/people.svg";
import chat from "./assets/chat.svg";
import more from "./assets/more.svg";

const navItems = [
  { name: "События", to: "/events", url: calendar },
  { name: "Люди", to: "/people", url: people },
  { name: "Чаты", to: "/chats", url: chat },
  { name: "Нетворкинг", to: "/networking", url: coffee },
  { name: "Еще", to: "/networking", url: more },
];

const NavItem = ({ item }: any) => {
  return (
    <NavLink className="text-xs flex flex-col items-center" to={item.to}>
      <img className="w-7 mb-1" src={item.url} />
      <p>{item.name}</p>
    </NavLink>
  );
};

const Navigation = () => {
  return (
    <div className="flex w-full justify-between py-5 px-5 border-t-2 border-zync-600">
      {navItems.map((obj, index) => {
        return <NavItem item={obj} key={index} />;
      })}
    </div>
  );
};

export default Navigation;

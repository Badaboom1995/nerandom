import { atom } from "recoil";

export interface IUser {
  fields?: {
    telegram_nickname: string;
    firstname: string;
    lastname: string;
    Avatar: string;
    city: string;
    about: string;
    gender: string;
    skills: any[];
    areas: any[];
    occupation: any[];
    readyForCoffee: boolean;
    isMember: boolean;
  } | null;
  loading: boolean;
  fulfilled: boolean;
}

const userAtom = atom({
  key: "qwe",
  default: {
    fields: null,
    loading: true,
    fulfilled: false,
  } as IUser,
});

export default userAtom;

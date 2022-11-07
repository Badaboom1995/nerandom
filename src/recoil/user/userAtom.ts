import { atom } from "recoil";
import { IUser } from "./types";

const userAtom = atom({
  key: "userAtom",
  default: {
    fields: {
      telegram_nickname: "",
      finishedOnboardings: [],
    },
    loading: true,
    fulfilled: false,
  } as IUser,
});

export default userAtom;

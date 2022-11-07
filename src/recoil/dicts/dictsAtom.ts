import { atom } from "recoil";

const dictsState = atom({
  key: "dictsAtom",
  default: {
    skills: [],
    occupation: [],
    areas: [],
    fulfilled: false,
    loading: true,
  },
});

export default dictsState;

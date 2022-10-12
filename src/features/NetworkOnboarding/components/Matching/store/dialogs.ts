import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const likesCounter = atom({
  key: "likesCounter", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

import { atom } from "recoil";

export const matchingCardsAtom = atom({
  key: "matchingCardState", // unique ID (with respect to other atoms/selectors)
  default: {
    likes: 10,
    currentBatch: [],
    slidesIndex: 0,
    loading: true,
  },
});

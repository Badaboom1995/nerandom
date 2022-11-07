import matchesSerivce from "services/matches";
import { getUsersByNick } from "services/users";
import { unwrapAirtable } from "utils/unwrap";
import { selector } from "recoil";
import userAtom from "../../../../../recoil/user/userAtom";

export const myQuery = selector({
  key: "MyQuery",
  get: async ({ get }) => {
    console.log(get(userAtom));
    return "";
    // const likesToMe: any = await matchesSerivce.getActionsToUser(
    //   user.username,
    //   "like",
    //   3
    // );
    // const usersNicks = likesToMe.map((item: any) => item.actionFrom);
    // const usersWhoLikesMe = await getUsersByNick(usersNicks).then((user) =>
    //   unwrapAirtable(user)
    // );
    // setCurrentButch(usersWhoLikesMe);
  },
});

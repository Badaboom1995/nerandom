import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "recoil/user/userAtom";
import {
  getUsersByNick,
  getUsersByNickTest,
  getUsersExcludeByNicks,
} from "services/users";
import { useEffect } from "react";
import matchesSerivce from "services/matches";
import { unwrapAirtable } from "utils/unwrap";
import { normalizeUser } from "utils/users";
import { matchingCardsAtom } from "./cards";

export const useLoadBatch = (telegram_nickname: string) => {
  const [cardsState, setCardsState] = useRecoilState(matchingCardsAtom);
  const { fields: user } = useRecoilValue(userAtom);
  // todo move dislikes, likes and actions to state

  const getBatch = async (batchSize = 5) => {
    const getLikesToMe: any = matchesSerivce.getActionsToUser(
      user.telegram_nickname,
      "like",
      batchSize
    );
    const getDislikesToMe: any = matchesSerivce.getActionsToUser(
      telegram_nickname,
      "dislike"
    );
    const getActionsFromMe: any =
      matchesSerivce.getActionsByNickname(telegram_nickname);
    const [dislikesToMe, actionsFromMe, likesToMe]: any = await Promise.all([
      getDislikesToMe,
      getActionsFromMe,
      getLikesToMe,
    ]);
    const filterThisUsers = [...actionsFromMe]
      .map((item) => {
        return item.actionTo === telegram_nickname
          ? item.actionFrom
          : item.actionTo;
      })
      .filter(function (item: any, pos: any, self: any) {
        return self.indexOf(item) == pos; // Remove duplicates
      });
    //  -------------
    const usersNicks = likesToMe.map((item: any) => item.actionFrom);
    let batch = await getUsersByNickTest(usersNicks, filterThisUsers).then(
      (user) => unwrapAirtable(user)
    );
    if (batch.length < batchSize) {
      const randomUsers = await getUsersExcludeByNicks(
        filterThisUsers,
        telegram_nickname,
        batchSize - batch.length
      );
      const batchNicks = batch.map((item: any) => item.telegram_nickname);
      const filteredUsers = randomUsers.filter(
        (item: any) => !batchNicks.includes(item.telegram_nickname)
      );
      batch = [...batch, ...filteredUsers];
    }
    const normalizedUsers = batch.map((item: any) => normalizeUser(item));
    const newState = {
      ...cardsState,
      currentBatch: normalizedUsers,
      loading: false,
    };
    setCardsState(newState);
    return newState;
  };
  const setLikes = async (state: any) => {
    const likes: any = await matchesSerivce.countTodayLikesFrom(
      telegram_nickname
    );

    setCardsState({
      ...state,
      likes: 10 - likes,
    });
  };
  const bootstrap = async () => {
    const state = await getBatch(100);
    await setLikes(state);
    // getBatch(100);
  };

  useEffect(() => {
    if (cardsState.currentBatch.length !== 0) return;
    bootstrap();
  }, []);

  return cardsState;
};

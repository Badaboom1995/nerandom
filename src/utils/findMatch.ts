import { getAllUsers } from "../services/users";
import matchesSerivce from "../services/matches";

const checkLike = (actions: any, he: any, me: any) => {
  let isLikeFound = false;
  actions.forEach((action: any) => {
    if (
      action.actionFrom === he.telegram_nickname &&
      action.actionTo === me.telegram_nickname
    ) {
      isLikeFound = action;
    }
  });
  return isLikeFound;
};

const getPairScore = (he: any, me: any) => {
  let score = 0;
  he.requestAreas?.forEach((area: string) => {
    if (me.areas?.includes(area)) score++;
  });
  he.requestSkills?.forEach((skill: string) => {
    if (me.skills?.includes(skill)) score++;
  });
  me.requestAreas?.forEach((area: string) => {
    if (he.areas?.includes(area)) score++;
  });
  me.requestSkills?.forEach((skill: string) => {
    if (he.skills?.includes(skill)) score++;
  });

  return score;
};

export const getScoredPairsAsync = async (currentUserNickname: string) => {
  return getAllUsers().then((unwrappedResult) => {
    //todo create current user
    const currentUser = unwrappedResult.find(
      (item: any) => item.telegram_nickname === currentUserNickname
    );
    const data = [...unwrappedResult].filter(
      (item) => item.telegram_nickname !== currentUser.telegram_nickname
    );

    const scorePairs = (): any[] => {
      return data.map((item) => ({
        ...item,
        score: getPairScore(item, currentUser),
      }));
    };

    const result = scorePairs()
      .filter(
        (item) =>
          item.telegram_nickname !== currentUserNickname ||
          !item.name ||
          !item.lastname
      )
      .sort((lh, rh) => (lh.score > rh.score ? -1 : 1));
    return result;
  });
};

export const getSortedPairs = (currentUser: any, usersToMatch: any[]) => {
  const scoredPairs: any[] = [];
  usersToMatch.forEach((userToMatch: any) => {
    scoredPairs.push({
      fields: userToMatch,
      score: getPairScore(userToMatch, currentUser),
    });
  });
  return scoredPairs
    .sort((lh, rh) => (lh.score > rh.score ? -1 : 1))
    .map((user: any) => user.fields);
};

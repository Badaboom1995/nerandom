import makeRequest from "./makeRequest";
import { unwrapAirtable } from "./unwrap";

export const getScoredPairs = (currentUserNickname: string) => {
  return makeRequest.get("Users").then((results) => {
    const unwrappedResult = unwrapAirtable(results);
    //todo create current user
    const currentUser = unwrappedResult.find(
      (item: any) => item.telegram_nickname === currentUserNickname
    );
    const data = [...unwrappedResult].filter(
      (item) => item.telegram_nickname !== currentUser.telegram_nickname
    );
    const getPairScore = (lh: any, rh: any) => {
      let score = 0;
      lh.requestAreas?.forEach((area: string) => {
        if (rh.areas?.includes(area)) score++;
      });
      lh.requestSkills?.forEach((skill: string) => {
        if (rh.skills?.includes(skill)) score++;
      });
      rh.requestAreas?.forEach((area: string) => {
        if (lh.areas?.includes(area)) score++;
      });
      rh.requestSkills?.forEach((skill: string) => {
        if (lh.skills?.includes(skill)) score++;
      });
      return score;
    };

    const scorePairs = (): any[] => {
      return data.map((item) => ({
        ...item,
        score: getPairScore(item, currentUser),
      }));
    };
    return scorePairs()
      .filter(
        (item) =>
          item.telegram_nickname !== currentUserNickname ||
          !item.name ||
          !item.lastname
      )
      .sort((lh, rh) => (lh.score > rh.score ? -1 : 1));
  });
};

// export default findMatch;

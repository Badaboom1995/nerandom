import makeRequest from "../utils/makeRequest";
import { unwrapAirtable } from "../utils/unwrap";

const matchesSerivce = {
  create: (userOne: string, userTwo: string) =>
    makeRequest.post("Matches", {
      records: [{ fields: { userOne, userTwo } }],
    }),
  createAction: (
    actionFrom: string,
    actionTo: string,
    type: "like" | "dislike"
  ) =>
    makeRequest.post("MatchesActions", {
      records: [
        {
          fields: {
            actionFrom,
            actionTo,
            type,
          },
        },
      ],
    }),
  checkIfMatch: (actionFrom: string, actionTo: string) =>
    makeRequest.get(
      `MatchesActions?&filterByFormula=AND({actionFrom}='${actionFrom}',{actionTo}='${actionTo}',{type}='like')`
    ),
  getActions: async (accum = [], offset = "") => {
    const actions = await makeRequest.get(`MatchesActions?offset=${offset}`);
    const data: any = [...unwrapAirtable(actions), ...accum];
    if (actions.data.offset) {
      const res: any = await matchesSerivce.getActions(
        data,
        actions.data.offset
      );
      return res;
    } else {
      return accum;
    }
  },
  checkForLike: async (lh: string, rh: string, offset = "") => {
    const response = await makeRequest.get(`MatchesActions?offset=${offset}`);
    const data = unwrapAirtable(response);
    let isLikeFound = false;
    data.forEach((item: any) => {
      const leftAppears = item.likeFrom === lh || item.likeTo === lh;
      const rightAppears = item.likeFrom === rh || item.likeTo === rh;
      isLikeFound = leftAppears || rightAppears;
    });
    if (isLikeFound) {
      return true;
    } else {
      const res: any = await matchesSerivce.checkForLike(
        lh,
        rh,
        response.data.offset
      );
      return res;
    }
  },
  getMatchesByNickname: (nickname: string) =>
    makeRequest.get(
      `Matches?&filterByFormula=OR({userOne}='${nickname}',{userTwo}='${nickname}')`
    ),
  getActionsToUser: async (
    telegram_nickname: string,
    type?: "like" | "dislike",
    max?: number
  ) => {
    const actions = await makeRequest.get(
      // prettier-ignore
      `MatchesActions?filterByFormula=AND(actionTo='${telegram_nickname}'${type ? `,type = '${type}'` : ""})${max ? `&maxRecords=${max}` : ''}`
    );
    return unwrapAirtable(actions);
  },
  getActionsByNickname: async (nickname: string) => {
    const actions = await makeRequest.get(
      `MatchesActions?filterByFormula=AND({actionFrom}='${nickname}')`
    );
    return unwrapAirtable(actions);
  },
  countTodayLikesFrom: async (nickname: string) => {
    const actions = await makeRequest.get(
      `MatchesActions?filterByFormula=AND({actionFrom}='${nickname}')&view=TodayLikes`
    );
    return unwrapAirtable(actions).length;
  },
  sendNotification: async (userIdOne: number, userIdTwo: number) => {
    fetch(
      `https://hegai-bot.herokuapp.com/matchNotify?userone=${userIdOne}&usertwo=${userIdTwo}`
    );
  },
};
export default matchesSerivce;

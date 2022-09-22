import makeRequest from "../helpers/makeRequest";

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
  getActionsByNickname: (nickname: string) =>
    makeRequest.get(
      `MatchesActions?&filterByFormula=AND({actionFrom}='${nickname}')`
    ),
  getMatchesByNickname: (nickname: string) =>
    makeRequest.get(
      `Matches?&filterByFormula=OR({userOne}='${nickname}',{userTwo}='${nickname}')`
    ),
};
export default matchesSerivce;

import makeRequest from "../helpers/makeRequest";

const matchesSerivce = {
  create: (data: any) => makeRequest.post("Matches", data),
};
export default matchesSerivce;

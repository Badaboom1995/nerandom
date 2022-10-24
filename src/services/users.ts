import makeRequest from "../helpers/makeRequest";
import { unwrapAirtable } from "../helpers/unwrap";

export const getUserByTGNick = (nick: string): Promise<any> =>
  makeRequest
    .get(`Users?&filterByFormula=Search('@${nick}', {telegram_nickname})`)
    .then((result) => {
      console.log(unwrapAirtable(result), result);
      return unwrapAirtable(result)[0];
    });

export const getUsersByNick = (nicksArray: string[]): Promise<any> => {
  const formula = nicksArray
    .reduce((acc: any, curr: any) => {
      return `${acc}{telegram_nickname}='${curr}',`;
    }, "")
    .slice(0, -1);
  return makeRequest.get(`Users?&filterByFormula=OR(${formula})`);
};

export const getAllUsers = async (): Promise<any> => {
  const users = await makeRequest.get("Users");
  const users2 = await makeRequest.get(`Users?offset=${users.data.offset}`);
  return [...unwrapAirtable(users), ...unwrapAirtable(users2)];
};

import makeRequest from "../utils/makeRequest";
import { unwrapAirtable } from "../utils/unwrap";

export const getUserByTGNick = (nick: string): Promise<any> =>
  makeRequest
    .get(`Users?&filterByFormula=Search('@${nick}', {telegram_nickname})`)
    .then((result) => {
      return unwrapAirtable(result)[0];
    });

export const patchUser = (id: any, fields: any): Promise<any> =>
  makeRequest.patch(`Users`, { records: [{ id, fields }] });

export const getUsersByNick = (nicksArray: string[]): Promise<any> => {
  const formula = nicksArray
    .reduce((acc: any, curr: any) => {
      return `${acc}{telegram_nickname}='${curr}',`;
    }, "")
    .slice(0, -1);
  return makeRequest.get(`Users?&filterByFormula=OR(${formula})`);
};
export const getUsersByNickTest = (
  nicksArray: string[],
  exclude: string[]
): Promise<any> => {
  const excludeFormula = exclude
    .reduce((acc: any, curr: any) => {
      return `${acc}{telegram_nickname}='${curr}',`;
    }, "")
    .slice(0, -1);
  const includeFormula = nicksArray
    .reduce((acc: any, curr: any) => {
      return `${acc}{telegram_nickname}='${curr}',`;
    }, "")
    .slice(0, -1);
  return makeRequest.get(
    `Users?&filterByFormula=AND(OR(${includeFormula}), NOT(OR(${excludeFormula})))`
  );
};
export const getUsersExcludeByNicks = (
  nicksArray: string[],
  currentUser: string,
  max = 100
): Promise<any> => {
  const formula = nicksArray
    .reduce((acc: any, curr: any) => {
      return `${acc}{telegram_nickname}='${curr}',`;
    }, "")
    .slice(0, -1);
  return makeRequest
    .get(
      `Users?maxRecords=${max}&filterByFormula=AND(NOT({name} = BLANK()), NOT({telegram_nickname} = '${currentUser}'), NOT(OR(${formula})))`
    )
    .then((res) => unwrapAirtable(res));
};

export const getAllUsers = async (): Promise<any> => {
  const users = await makeRequest.get("Users");
  const users2 = await makeRequest.get(`Users?offset=${users.data.offset}`);
  return [...unwrapAirtable(users), ...unwrapAirtable(users2)];
};

export const getUsers = async (max = 100): Promise<any> => {
  const users = await makeRequest.get(
    `Users?maxRecords=${max}&filterByFormula=OR(NOT({name} = BLANK()))`
  );
  return unwrapAirtable(users);
};

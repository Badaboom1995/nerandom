import { dummyUrl } from "../config/consts";

export const normalizeUser = (user: any) => ({
  ...user,
  Avatar: user.Avatar ? user.Avatar[0].url : dummyUrl,
});

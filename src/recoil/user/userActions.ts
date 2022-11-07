import { useRecoilState } from "recoil";
import { useEffect } from "react";
import userAtom from "./userAtom";
import { getUserByTGNick } from "../../services/users";
import { getTelegramUserData } from "../../utils/telegram";
import { dummyUrl } from "../../config/consts";

export const useLoadUser = () => {
  const telegramData = getTelegramUserData();
  const [user, setUser] = useRecoilState(userAtom);

  const fetchUser = async (tgNick: string) => {
    const fields = await getUserByTGNick(tgNick);
    fields.Avatar = fields?.Avatar ? fields.Avatar[0].url : dummyUrl;
    setUser({ ...user, fulfilled: true, loading: false, fields });
  };

  useEffect(() => {
    fetchUser(telegramData?.telegram_nickname);
  }, []);

  return user;
};

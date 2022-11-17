export const getTelegramUserData = () => {
  const wind: any = window;
  if (!wind.Telegram.WebApp.initDataUnsafe.user) return {};
  const { username, firstname, lastname, photoUrl } =
    wind.Telegram.WebApp.initDataUnsafe.user;

  const result: any = {
    firstname,
    lastname,
    telegram_nickname: username,
    Avatar: photoUrl,
  };
  return result;
};

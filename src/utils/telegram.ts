export const getTelegramUserData = () => {
  const wind: any = window;

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

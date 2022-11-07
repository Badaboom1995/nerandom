export interface IUser {
  fields: {
    telegram_nickname: string;
    firstname?: string;
    lastname?: string;
    Avatar?: string;
    city?: string;
    about?: string;
    gender?: string;
    skills?: any[];
    areas?: any[];
    occupation?: any[];
    readyForCoffee?: boolean;
    finishedOnboardings?: any[];
    isMember?: boolean;
  };
  loading: boolean;
  fulfilled: boolean;
}

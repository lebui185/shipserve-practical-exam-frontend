import { LoggedInUser } from './logged-in-user';

export interface LoginSuccessResponse {
  token: string;
  user: LoggedInUser;
}

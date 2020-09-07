export interface LoggedInUser {
  id: number;
  firstName: string;
  surname: string;
  email: string;
  username: string;
  active: boolean;
  roles: string[];
  companyId: number;
}

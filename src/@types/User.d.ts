import {IRole} from "./Role";

export class IUser {
  id?: number;
  name: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  banned: boolean;
  roles?: IRole[];
}

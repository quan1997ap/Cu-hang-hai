import { User } from "./user.model";

export interface IAuthResponse {
  token: string;
  user: User
}

export type TAuthInfo = IAuthResponse | undefined;
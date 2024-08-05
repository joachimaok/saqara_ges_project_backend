import { User } from '../schemas/user.schema';

export interface IAuthResponse {
  token: string;
  message: string;
  user: User;
}

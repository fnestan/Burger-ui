import {Role} from './Role';

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  token: string;
  role: Role;
}

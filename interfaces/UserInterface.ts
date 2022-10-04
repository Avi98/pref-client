export type IUser = {
  id: number;
  email: string;
  name: string;
  userName: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  roleId: number;
  emailVerified: boolean;
};

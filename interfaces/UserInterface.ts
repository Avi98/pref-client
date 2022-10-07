import { PermissionsEnum } from "../enums/PermissionEnum";
import { RoleEnum } from "../enums/RoleEnum";

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

export type Create_User = {
  email: string;
  name: string;
  userName: string;
  password: string;
  role: RoleEnum;
  permission: PermissionsEnum[];
};

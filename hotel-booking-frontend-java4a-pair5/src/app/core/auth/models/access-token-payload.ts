import { AuthRoles } from "../constants/auth-roles";

export interface AccessTokenPayload {
    sub: string;
    iat: number;
    exp: number;
    userId: number;
    guestId: number;
    roles: AuthRoles[];
  }
  
  export interface Role {
    role: string;
  }
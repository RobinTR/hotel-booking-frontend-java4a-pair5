export interface AccessTokenPayload {
    sub: string;
    iat: number;
    exp: number;
    userId: number;
    roles: Role[];
  }
  
  export interface Role {
    role: string;
  }
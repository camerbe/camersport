export interface JwtPayload {
  iss:string;
  iar:string;
  exp:string;
  nbf:string;
  jti:string;
  sub:string;
  prv:string;
  role:string;
  fullName:string;
  expires_in:string;
  userId:number;
}

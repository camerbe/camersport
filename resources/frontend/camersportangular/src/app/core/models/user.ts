import { UserDetails } from "./user-details";

export interface User {
  success:boolean;
  data:UserDetails[];
  message:string;
}

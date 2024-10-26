export interface Redacteur {
  id:number,
  fullName:string,
  email:string,
  role:string
}

export interface Administrateur{
  success:boolean,
  data:Redacteur,
  message:string
}

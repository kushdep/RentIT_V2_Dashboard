export interface LoginFormStt{
    email:String;
    password:String ;
    error?:String;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}


export interface Error{
    message:string
}
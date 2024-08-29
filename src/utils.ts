export type Gender = "male" | "female";
export interface Cast {
  id: number,
  name: string,
  gender: Gender,
  birthday: number,
  photo: string
}
export function base64ToImg(){
  
}

export type FitlerType = "number" | "string" | "datetime"
export interface Filter {
  field: string,
  type: FitlerType
}

export type SFilter = {
  filter: Filter;
  lv: string;
  rv?: string;
}

export const Links = {
  auth:{
    login: "/",
    logout: "/logout",
    signup: "/signup"
  },
  cast: {
    list: "/cast",
    add: "/cast/add",
    mod: "/cast/mod",
    rem: "/cast/del"
  }

}
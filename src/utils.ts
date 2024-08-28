export type Gender = "male" | "female";
export interface Cast {
  id: number,
  name: string,
  gender: Gender,
  birthday: string,
  photo: string
}
export function base64ToImg(){
  
}

export type FitlerType = "number" | string | "datetime"
export interface Filter {
  field: string,
  type: FitlerType
}

export type SFilter = {
  filter: Filter;
  lv: unknown;
  rv?: unknown;
}
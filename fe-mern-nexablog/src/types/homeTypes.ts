import { IBLog } from "./blogTypes";

export interface IGlobalState {
  global: {
    name: string;
  };
}

export interface IHomeState {
  home: {
    dataBlogs: IBLog[];
    page: {
      currentPage: number;
      totalPage: number;
    };
  };
}

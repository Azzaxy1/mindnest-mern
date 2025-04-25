import { IJournal } from "./journalTypes";

export interface IGlobalState {
  global: {
    name: string;
  };
}

export interface IHomeState {
  home: {
    dataJournals: IJournal[];
    page: {
      currentPage: number;
      totalPage: number;
    };
  };
}

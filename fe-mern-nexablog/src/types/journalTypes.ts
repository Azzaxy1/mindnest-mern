interface IAuthor {
  uid: string;
  name: string;
}

export interface IJournal {
  _id: string;
  title: string;
  image: string;
  body: string;
  author: IAuthor;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Journal {
  title: string;
  image: string;
  body: string;
}
